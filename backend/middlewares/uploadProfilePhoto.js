// middlewares/uploadProfilePhoto.js
import cloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";

export const uploadProfilePhoto = async (req, _, next) => {
    if (req.files?.profilePhoto?.[0]) {
        const buffer = req.files.profilePhoto[0].buffer;

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: `${process.env.APP_NAME}/Profile Pictures`,
                },
                (error, result) => {
                    if (error) return reject(new ApiError(500, "Cloudinary Error in Profile Picture"));
                    resolve(result);
                }
            ).end(buffer);
        });

        req.updateData = req.updateData || {};
        req.updateData["profile.profilePhoto"] = result.secure_url;

        // Optionally delete previous one
        const loggedInUser = await User.findById(req.id).select("profile.profilePhoto");

        if (!loggedInUser) {
            throw new ApiError(404, "User not found.")
        }

        if (loggedInUser?.profile?.profilePhoto) {
            await deleteProfilePhoto(loggedInUser.profile.profilePhoto)
        }
    }

    next();
};

const deleteProfilePhoto = async (publicUrl) => {

    try {
        if (!publicUrl) return;

        const url = new URL(publicUrl);
        const pathname = decodeURIComponent(url.pathname); // decode %20 to space

        // Match everything after "/upload/v12345678/"
        const match = pathname.match(/\/upload\/v\d+\/(.+)$/);

        if (!match || !match[1]) {
            console.error("Could not extract publicId from Cloudinary URL");
            return;
        }

        const publicIdWithExtension = match[1]; // e.g. "Job Hunt/Profile Pictures/jahk3f2ohxttzfduwloc.jpg 
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension

        const response = await cloudinary.api.delete_resources(publicId, {
            type: 'upload', resource_type: "image", // handles image etc.
        });

        if (response.deleted[publicId] !== "deleted")
            console.log("Cloudinary Deletion Failed");

    } catch (error) {
        console.error("Cloudinary Deletion Error:", error);
    }
}
