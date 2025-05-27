import express from 'express'
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import asyncHandler from '../utils/asyncHandler.js';

const applicationRouter = express.Router();

applicationRouter
    .route("/apply/:id")
    .post(asyncHandler(isAuthenticated), asyncHandler(applyJob));

applicationRouter
    .route("/get")
    .get(asyncHandler(isAuthenticated), asyncHandler(getAppliedJobs));

applicationRouter
    .route("/:id/applicants")
    .get(asyncHandler(isAuthenticated), asyncHandler(getApplicants));

applicationRouter
    .route("/status/:id/update")
    .post(asyncHandler(isAuthenticated), asyncHandler(updateStatus));


export default applicationRouter;