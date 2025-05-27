import cloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";

export const uploadResume = async (req, _, next) => {

    if (req.files?.resume?.[0]) {
        const buffer = req.files.resume[0].buffer;

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: `${process.env.APP_NAME}/Resumes`,
                    resource_type: "raw",
                    format: "pdf"
                },
                (error, result) => {
                    if (error) return reject(new ApiError(500, "Cloudinary Error in Resume Upload"));
                    resolve(result);
                }
            ).end(buffer);
        });

        req.updateData = req.updateData || {};
        req.updateData["profile.resume"] = result.secure_url;
        req.updateData["profile.resumeOriginalName"] = req.files.resume[0].originalname;

        const loggedInUser = await User.findById(req.id).select("profile.resume");

        if (!loggedInUser) {
            throw new ApiError(404, "User not found.")
        }

        if (loggedInUser?.profile?.resume) {
            await deleteResume(loggedInUser.profile.resume)
        }
    }

    next();
};

const deleteResume = async (publicUrl) => {

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

        const publicIdWithExtension = match[1]; // e.g. "Job Hunt/Resumes/filename.pdf"

        const response = await cloudinary.api.delete_resources(publicIdWithExtension, {
            type: 'upload',
            resource_type: "raw", // handles raw (PDF) etc.
        });

        if (response.deleted[publicIdWithExtension] !== "deleted") {
            console.error("Cloudinary Deletion Failed");
        }


    } catch (error) {
        console.error("Cloudinary Deletion Error:", error);
    }
}
