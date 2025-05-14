import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import Food from "../models/food.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllFood = asyncHandler(async (req, res) => {
  const { role } = req.user;
  let query = {};
  if (role === "user") {
    query = { isActive: true };
  }

  const food = await Food.find(query);

  res.status(200).json(new ApiSuccess(200, "Food Fetched Successfully", food));
});

export const addFood = asyncHandler(async (req, res) => {
  const { name, foodtype, price, imageUrl } = req.body;

  if (!name || !foodtype || !price || !imageUrl) {
    throw new ApiError(400, "Fields should not be empty");
  }

  const existingFood = await Food.findOne({ name });

  if (existingFood) {
    throw new ApiError(400, "Food Already Exists");
  }

  const food = await Food.create({ name, foodtype, price, imageUrl });

  res.status(200).json(new ApiSuccess(200, "Food Added Successfully", food));
});

export const getSingleFood = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingFood = await Food.findById(id);

  if (!existingFood) {
    throw new ApiError(400, "No Such Food");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, "Fetched Food Successfully", existingFood));
});

export const editFood = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, foodtype, price, imageUrl } = req.body;

  if (!name || !foodtype || !price || !imageUrl) {
    throw new ApiError(400, "Fields should not be empty");
  }

  const existingFood = await Food.findByIdAndUpdate(
    id,
    { name, foodtype, price, imageUrl },
    { new: true }
  );

  if (!existingFood) {
    throw new ApiError(400, "No Such Food");
  }

  res
    .status(200)
    .json(new ApiSuccess(200, "Updated Successfully", existingFood));
});

export const handleFoodActivate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log(id)
  const existingFood = await Food.findById(id);
  if (!existingFood) {
    throw new ApiError(400, "No Such Food Exists");
  }

  const updatedFood = await Food.findByIdAndUpdate(
    id,
    {
      isActive: !existingFood.isActive,
    },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiSuccess(200, "Updated Successfully", updatedFood));
});
