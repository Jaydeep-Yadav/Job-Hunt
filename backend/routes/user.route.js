import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import { updateProfileSchema, userLoginSchema, userRegisterSchema } from "../validations/user.validation.js";
import zodValidate from '../middlewares/zodValidate.js';
import asyncHandler from "../utils/asyncHandler.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
import { uploadProfilePhoto } from "../middlewares/uploadProfilePhoto.js";
import { uploadResume } from "../middlewares/uploadResume.js";
import multer from 'multer';

const userRouter = express.Router();


userRouter
    .route("/register")
    // .post( asyncHandler(register));
    .post(zodValidate(userRegisterSchema), asyncHandler(register));

userRouter
    .route("/login")
    .post(zodValidate(userLoginSchema), asyncHandler(login));

userRouter
    .route("/profile/update")
    .patch(zodValidate(updateProfileSchema), asyncHandler(isAuthenticated), singleUpload, asyncHandler(uploadResume), asyncHandler(uploadProfilePhoto), asyncHandler(updateProfile));

userRouter
    .route("/logout")
    .get(asyncHandler(isAuthenticated), logout);


export default userRouter;