import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
  const token = req.header("auth-token");
  console.log(token)
  if (!token){
    throw new ApiError(400,"No Token Found")
  }
  
  const decoded = jwt.verify(token, "jwt-secret");
  console.log(decoded)
  const user = await User.findById(decoded._id);
  if (!user){
    throw new ApiError(400,"No User Exists")
  }

  req.user = user;
  console.log("middleware passed")
  next();
});

export const verifyAdmin = asyncHandler(async (req, res, next) => {
  console.log("hello")
  if (req.user.role !== "admin"){
    throw new ApiError(400,"You Have No Access")
  }
   console.log("middleware passed 2")
  next();
});
