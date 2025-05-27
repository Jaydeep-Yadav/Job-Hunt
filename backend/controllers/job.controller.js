import Job from "../models/job.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js"

// admin post krega job
export const postJob = async (req, res) => {

    const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId} = req.body;
    const userId = req.id;

    const job = await Job.create({
        title,
        description,
        requirements: requirements.split(","),
        salary,
        location,
        jobType,
        experienceLevel,
        position,
        company: companyId,
        created_by: userId
    });


    return res.status(201)
        .json(new ApiResponse(201, "New job created successfully.", job));

}

// jobseeker k liye

export const getAllJobs = async (req, res) => {

    const keyword = req.query.keyword || "";

    const query = {
        $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
        ]
    };

    const jobs = await Job.find(query).populate({
        path: "company"
    }).sort({ createdAt: -1 });

    if (!jobs) {
        throw new ApiError(404, "Jobs not found.");
    };

    return res.status(200)
        .json(new ApiResponse(200, "", jobs));

}

// jobseeker
export const getJobById = async (req, res) => {

    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
        path: "applications"
    })

    if (!job) {
        throw new ApiError(404, "Job not found.");
    };

    return res.status(200)
        .json(new ApiResponse(200, "", job));

}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {

    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
        path: 'company',
        createdAt: -1
    });

    if (!jobs) {
        throw new ApiError(404, "Job not found.");
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "", jobs));

}
