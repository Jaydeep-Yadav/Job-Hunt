import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"
import asyncHandler from "../utils/asyncHandler.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js"
import { singleUpload } from "../middlewares/multer.js";
import { uploadCompanyLogo } from "../middlewares/uploadCompanyLogo.js";
import { registerCompanySchema, updateCompanySchema } from "../validations/company.validation.js";
import zodValidate from '../middlewares/zodValidate.js';

const companyRouter = express.Router();

companyRouter
    .route("/register")
    .post(zodValidate(registerCompanySchema), asyncHandler(isAuthenticated), asyncHandler(registerCompany));

companyRouter
    .route("/get")
    .get(asyncHandler(isAuthenticated), asyncHandler(getCompany));

companyRouter
    .route("/get/:id")
    .get(asyncHandler(isAuthenticated), asyncHandler(getCompanyById));

companyRouter
    .route("/update/:id")
    .patch(zodValidate(updateCompanySchema), asyncHandler(isAuthenticated), singleUpload, asyncHandler(uploadCompanyLogo), asyncHandler(updateCompany));

export default companyRouter;