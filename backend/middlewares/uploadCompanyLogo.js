import cloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/apiError.js";
import Company from "../models/company.model.js";

export const uploadCompanyLogo = async (req, res, next) => {

    if (req.files?.logo?.[0]) {
        const buffer = req.files.logo[0].buffer;

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: `${process.env.APP_NAME}/Company Logo`,
                },
                (error, result) => {
                    if (error) return reject(new ApiError(500, "Cloudinary Error in Company Logo Upload"));
                    resolve(result);
                }
            ).end(buffer);
        });

        req.updateData = req.updateData || {};
        req.updateData["logo"] = result.secure_url;

        // Optionally delete previous one
        const company = await Company.findById(req.params.id).select("logo");

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }

        if (company?.logo) {
            await deleteCompanyLogo(company.logo);
        }

    }

    next();
}

const deleteCompanyLogo = async (publicUrl) => {
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

        const publicIdWithExtension = match[1]; // e.g. "Job Hunt/Company Logo/jahk3f2ohxttzfduwloc.jpg 
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension

        const response = await cloudinary.api.delete_resources(publicId, {
            type: 'upload', resource_type: "image", // handles image etc.
        });

        if (response.deleted[publicId] !== "deleted")
            console.log("Cloudinary Deletion Failed");

    } catch (error) {
        console.error(error);
    }
}