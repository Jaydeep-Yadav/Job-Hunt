import { z } from "zod";

export const jobValidationSchema = z.object({
    title: z
        .string({
            required_error: "Job title is required",
        })
        .min(3, "Job title must be at least 3 characters")
        .max(100, "Job title should not exceed 100 characters")
        .trim(),

    description: z
        .string({
            required_error: "Job description is required",
        })
        .min(20, "Description must be at least 20 characters")
        .max(2000, "Job Description should not exceed 2000 characters")
        .trim(),

    requirements: z
        .string({
            required_error: "Job requirements are required",
        })
        .min(10, "Requirements must be at least 10 characters"),

    salary: z
        .number({
            required_error: "Salary is required",
            invalid_type_error: "Salary must be a number",
        })
        .min(0, "Salary must be a positive number"),

    experienceLevel: z
        .number({
            required_error: "Experience level is required",
            invalid_type_error: "Experience must be a number",
        })
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years"),

    location: z
        .string({
            required_error: "Location is required",
        })
        .min(2, "Location must be at least 2 characters")
        .max(200, "Location must be less than 200 characters"),

    jobType: z
        .enum(["full-time", "part-time", "contract", "internship", "freelance", "remote"], {
            required_error: "Job type is required and must be valid",
        }),

    position: z
        .number({
            required_error: "Number of open positions is required",
            invalid_type_error: "Position must be a number",
        })
        .min(1, "At least one position must be available")
        .max(1000, "Positions cannot exceed 1000"),

    companyId: z
        .string({
            required_error: "Company ID is required",
        })
        // .regex(/^[a-f\d]{24}$/i, "Invalid Company ID (must be a MongoDB ObjectId)"),
});
