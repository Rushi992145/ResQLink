import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// JWT Authentication Middleware
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        console.log(req.cookies);
        const token = req.body.accessToken || req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("token is",token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

// Role-Based Authorization Middleware
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, "Access Denied. Insufficient permissions"));
        }
        next();
    };
};
