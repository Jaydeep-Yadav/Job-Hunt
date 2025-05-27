import express from 'express'
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";
import isAuthenticated from '../middlewares/isAuthenticated.js';
import asyncHandler from '../utils/asyncHandler.js';
import zodValidate from '../middlewares/zodValidate.js';
import { jobValidationSchema } from "../validations/job.validation.js";

const jobRouter = express.Router();

jobRouter
    .route("/post")
    .post(zodValidate(jobValidationSchema), asyncHandler(isAuthenticated),asyncHandler(postJob));

jobRouter
    .route("/get")
    .get(asyncHandler(isAuthenticated), asyncHandler(getAllJobs));

jobRouter
    .route("/getadminjobs")
    .get(asyncHandler(isAuthenticated), asyncHandler(getAdminJobs));

jobRouter
    .route("/get/:id")
    .get(asyncHandler(isAuthenticated), asyncHandler(getJobById));

export default jobRouter;