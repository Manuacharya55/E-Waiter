import Food from "../models/food.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingFood = await Food.findById(id);

  if (!existingFood) {
    throw new ApiError(400, "No Such Reciepe");
  }

  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    throw new ApiError(400, "No Such User");
  }

  let index = existingUser.cart.findIndex((ele) => ele.food == id);

  if (index != -1) {
    existingUser.cart[index].quantity += 1;

  } else {
    existingUser.cart.push({
      food: id,
      quantity: 1,
    });
    index = existingUser.cart.length - 1;

  }

  await existingUser.save();
  const food = await User.findById(req.user._id).populate("cart.food");

  res.json(new ApiSuccess(200, "food added successfully", food.cart[index]));
});

export const removeItem = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingFood = await Food.findById(id);

  if (!existingFood) {
    throw new ApiError(400, "No Such Reciepe");
  }

  const existingUser = await User.findById(req.user._id);

  if (!existingUser) {
    throw new ApiError(400, "No Such User");
  }

 let index = existingUser.cart.findIndex((ele) => ele.food == id);

  if (index != -1) {
    if (existingUser.cart[index].quantity > 1) {
      existingUser.cart[index].quantity -= 1;
    } else {
      existingUser.cart.splice(index, 1);
      index = existingUser.cart.length - 1;
    }
  }

  await existingUser.save();
  const food = await User.findById(req.user._id).populate("cart.food");

  res.json(new ApiSuccess(200, "food removed successfully", food[index]));
});

export const loadCart = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.user._id).populate("cart.food");

  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  const food = existingUser.cart;
  res.json(new ApiSuccess(200, "Cart Fetched", food));
});

export const clearCart = asyncHandler(async (req, res) => {
  const existingUser = await User.findById(req.user._id).populate("cart.food");

  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  existingUser.cart = [];
  const food = await existingUser.save();
  res.json(new ApiSuccess(200, "Cart Fetched", food));
});
