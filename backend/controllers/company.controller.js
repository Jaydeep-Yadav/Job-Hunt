import Company from "../models/company.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";

export const registerCompany = async (req, res) => {
    const { companyName } = req.body;

    if (!companyName) {
        throw new ApiError(400, 'Company name is required.');
    }

    let createdCompany = await Company.findOne({ name: companyName });

    if (createdCompany) {
        throw new ApiError(400, "You can't register same company.");
    };

    createdCompany = await Company.create({
        name: companyName,
        userId: req.id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, 'Company registered successfully', createdCompany));
}

export const getCompany = async (req, res) => {

    const userId = req.id; // logged in user id

    const companies = await Company.find({ userId });

    if (!companies) {
        throw new ApiError(404, "Companies not found.");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, '' , companies));

}

export const getCompanyById = async (req, res) => {
    const companyId = req.params.id;

    const company = await Company.findById(new mongoose.Types.ObjectId(companyId));

    if (!company) {
        throw new ApiError(404, "Company not found.");
    }

    return res
        .status(200)
        .json(new ApiResponse(201, "", company));
}

export const updateCompany = async (req, res) => {

    const { name, description, website, location } = req.body;

    const updateData = {
        name, description, website, location,
        ...(req.updateData || {}) // coming from upload company logo middleware
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
        throw new ApiError(404, "Company not found.");
    }
    return res.status(200)
        .json(new ApiResponse(200, "Company information updated."));

}