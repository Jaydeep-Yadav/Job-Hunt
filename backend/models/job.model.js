import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
            minlength: [3, "Job title must be at least 3 characters"],
            maxlength: [100, "Job title must be less than 100 characters"]
        },

        description: {
            type: String,
            required: [true, "Job description is required"],
            trim: true,
            minlength: [20, "Description must be at least 20 characters"],
            maxlength: [2000, "Description must be less than 2000 characters"]
        },

        requirements: [
            {
                type: String,
                trim: true,
                maxlength: [300, "Each requirement must be less than 300 characters"]
            }
        ],

        salary: {
            type: Number,
            required: [true, "Salary is required"],
            min: [0, "Salary must be a positive number"]
        },

        experienceLevel: {
            type: Number,
            required: [true, "Experience level is required"],
            min: [0, "Experience must be at least 0 years"],
            max: [50, "Experience cannot exceed 50 years"]
        },

        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
            maxlength: [200, "Location must be less than 200 characters"]
        },

        jobType: {
            type: String,
            required: [true, "Job type is required"],
            enum: {
                values: ["full-time", "part-time", "internship", "contract","freelance", "remote"],
                message: "Invalid job type"
            },
            lowercase: true,
            trim: true
        },

        position: {
            type: Number,
            required: [true, "Number of open positions is required"],
            min: [1, "At least one position must be available"],
            max: [1000, "Positions cannot exceed 1000"]
        },

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
            required: [true, "Job must be linked to a company"]
        },

        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Job must be posted by a user"]
        },
        
        applications: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application"
            }
        ]
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;