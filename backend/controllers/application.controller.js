import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

export const applyJob = async (req, res) => {

    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
        throw new ApiError(400, "Job id is required.");
    };

    // check if the user has already applied for the job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

    if (existingApplication) {
        throw new ApiError(400, "You have already applied for this job");
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found");
    }

    // create a new application
    const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
    });

    job.applications.push(newApplication._id);

    await job.save();

    return res
        .status(201)
        .json(new ApiResponse(201, "Job applied successfully."));

};

export const getAppliedJobs = async (req, res) => {

    const userId = req.id;
    const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'company',
            options: { sort: { createdAt: -1 } },
        }
    });

    if (!application) {
        throw new ApiError(404, "No Applications");
    };

    return res
        .status(200)
        .json(new ApiResponse(201, "", application));
}

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
        path: 'applications',
        options: { sort: { createdAt: -1 } },
        populate: {
            path: 'applicant'
        }
    });

    if (!job) {
        throw new ApiError(404, 'Job not found.');
    };

    return res
        .status(200)
        .json(new ApiResponse(200, "", job));
}

export const updateStatus = async (req, res) => {

    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
        throw new ApiError(400, 'status is required');
    };

    // find the application by applicantion id
    const application = await Application.findOne({ _id: applicationId });

    if (!application) {
        throw new ApiError(404, "Application not found.");
    };

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res
        .status(200)
        .json(new ApiResponse(201, "Status updated successfully."));
}