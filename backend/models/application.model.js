import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: [true, "Job reference is required"]
        },

        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Applicant reference is required"]
        },

        status: {
            type: String,
            enum: {
                values: ["pending", "accepted", "rejected"],
                message: "Status must be either pending, accepted, or rejected"
            },
            default: "pending"
        },


        // TODO: enhancements
        // coverLetter: {
        //     type: String,
        //     trim: true,
        //     maxlength: [2000, "Cover letter must be under 2000 characters"]
        // },

        // resume: {
        //     type: String,
        //     trim: true,
        //     match: [
        //         /^$|^https?:\/\/[^\s/$.?#].[^\s]*$/,
        //         "Resume must be a valid URL"
        //     ]
        // },

        // appliedAt: {
        //     type: Date,
        //     default: Date.now
        // },

        // reviewedAt: {
        //     type: Date
        // }
    },
    { timestamps: true }
);

// Compound index to prevent duplicate applications per job by same user
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model("Application", applicationSchema);
export default Application;