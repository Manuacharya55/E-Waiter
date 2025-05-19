import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token){
    throw new ApiError(400,"No Token Found")
  }
  
  const decoded = jwt.verify(token, "jwt-secret");

  const user = await User.findById(decoded._id);
  if (!user){
    throw new ApiError(400,"No User Exists")
  }

  req.user = user;
console.log("passed")
  next();
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {

  if (req.user.role !== "admin"){
    throw new ApiError(400,"You Have No Access")
  }

  next();
});

export const verifySheff = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "sheff"){
    throw new ApiError(400,"You Have No Access")
  }

  next();
});

export const verifyWaiter = asyncHandler(async (req, res, next) => {

  if (req.user.role !== "waiter"){
    throw new ApiError(400,"You Have No Access")
  }

  next();
});