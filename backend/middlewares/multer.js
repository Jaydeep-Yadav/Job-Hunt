import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory before Cloudinary upload

const fileFilter = (_, file, cb) => {
    const imageMimeTypes = ["image/jpeg", "image/png", "image/webp"];
    const pdfMimeType = "application/pdf";

    if (file.fieldname === "profilePhoto" || file.fieldname === "logo") {
        if (imageMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPEG, PNG, or WEBP images are allowed for profile photo"));
        }
    } else if (file.fieldname === "resume") {
        if (file.mimetype === pdfMimeType) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed for resume"));
        }
    } else {
        cb(new Error("Unexpected field"));
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter,
});

export const singleUpload = upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "logo", maxCount: 1 }
]);