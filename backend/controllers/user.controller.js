import User from '../models/user.model.js'
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import ApiResponse from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';

export const register = async (req, res) => {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
        throw new ApiError(400, 'Something is missing');
    };

    const file = req?.file;
    let cloudResponse = '';

    if (file) {

        const fileUri = getDataUri(file);
        const folder = process.env.APP_NAME + "/Profile Picture";

        // Upload new profile picture //
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
            folder: folder
        });
    }

    const user = await User.findOne({ email });

    if (user) {
        throw new ApiError(409, 'User already exist with this email.');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
            profilePhoto: cloudResponse?.secure_url,
        }
    });

    return res
        .status(201)
        .json(new ApiResponse(201, 'User registered successfully', createdUser));
}

export const login = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        throw new ApiError(400, 'Something is missing');
    };

    let user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(400, 'Incorrect email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(400, 'Incorrect email or password.');
    };

    // check role is correct or not
    if (role !== user.role) {
        throw new ApiError(400, "Account doesn't exist with current role.");
    };

    const tokenData = {
        userId: user._id
    }

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Remove password before sending user object
    const userObj = user.toObject();
    delete userObj.password;

    const isProd = process.env.NODE_ENV === 'production';

    const cookieConfig = {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,  // Only true in production
        sameSite: isProd ? 'None' : 'Lax' // Lax for local, None for cross-site
    }

    return res
        .status(200)
        .cookie("jobhunt", token, cookieConfig)
        .json(new ApiResponse(200, `Welcome back ${userObj.fullname}`, userObj))
}

export const logout = async (_, res) => {
    return res
        .status(200)
        .cookie("jobhunt", "", { maxAge: 0 })
        .json(new ApiResponse(200, `Logged out successfully.`))
}

export const updateProfile = async (req, res) => {
    const userId = req.id; // from middleware authentication
    let loggedInUser = await User.findById(userId).select("-password");

    if (!loggedInUser) {
        throw new ApiError(404, "User not found.")
    }

    const { fullname, phoneNumber, bio, skills, email } = req.body;

    let userData = {};

    if (fullname) userData.fullname = fullname;
    if (email) userData.email = email;
    if (phoneNumber) userData.phoneNumber = phoneNumber;
    if (bio) userData["profile.bio"] = bio;
    if (skills) {
        const parsedSkills = Array.isArray(skills) ? skills : skills.split(",").map(s => s.trim());
        userData["profile.skills"] = parsedSkills;
    }

    const updateData = {
        ...userData,
        ...(req.updateData || {})   // coming from profile pic and resume upload middleware
    };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true, // tells Mongoose to return the updated document instead of old data
    }).select("-password");

    return res.status(200).json(new ApiResponse(200, "Profile updated successfully.", updatedUser))
}

