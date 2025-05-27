import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
            maxlength: [50, "Name can't exceed 50 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/\S+@\S+\.\S+/, "Invalid email format"],
        },

        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },

        role: {
            type: String,
            enum: {
                values: ["jobseeker", "recruiter"],
                message: "Role must be either jobseeker or recruiter",
            },
            required: [true, "Role is required"],
        },

        profile: {
            bio: {
                type: String,
                maxlength: [300, "Bio can't exceed 300 characters"],
                trim: true,
            },
            skills: [
                {
                    type: String,
                    trim: true,
                },
            ],
            resume: {
                type: String, // Assume this is a URL
                match: [/^https?:\/\/.+/, "Resume must be a valid URL"],
            },
            resumeOriginalName: {
                type: String,
                trim: true,
            },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            profilePhoto: {
                type: String,
                default: "https://res.cloudinary.com/dyqjyzxg0/image/upload/v1748281126/Job%20Hunt/Profile%20Pictures/cu65kabqt7dvfkn3om7k.jpg",
                match: [/^$|^https?:\/\/.+/, "Profile photo must be a valid URL"],
            },
        },
    },

    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
