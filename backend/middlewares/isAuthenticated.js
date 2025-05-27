import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";

const isAuthenticated = async (req, _, next) => {

    const token = req.cookies?.jobhunt;

    if (!token) { throw new ApiError(401, "User not authenticated") }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
        throw new ApiError(401, "Invalid Token");
    }

    req.id = decode.userId;

    next();
}

export default isAuthenticated;