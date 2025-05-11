import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";

export const registerTable = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(401, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    throw new ApiError(400, "User Already Exists");
  }

  const user = await User.create({
    username,
    password,
  });

  const token = await user.generateToken();
  res
    .status(200)
    .json(new ApiSuccess(200, "table registerd successfully", { user, token }));
});

export const loginTable = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const existingUser = await User.findOne({ username: username });

  if (!existingUser || !existingUser.isActive) {
    throw new ApiError(400, "No Such User Exists");
  }
  
  console.log(existingUser);
  const isValidPassword = await existingUser.matchPassword(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const token = await existingUser.generateToken();

  res
    .status(200)
    .json(
      new ApiSuccess(200, "logged in successfully", { existingUser, token })
    );
});

export const handleActivate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingTable = await User.findById(id);

  if (!existingTable) {
    throw new ApiError(400, "No Such Table exists");
  }

  const updatedtable = await User.findByIdAndUpdate(
    id,
    { isActive: !existingTable.isActive },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiSuccess(200, "Updated Status Successfully", updatedtable));
});
