import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import Order from "../models/order.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { io } from "../index.js";

export const orderFood = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id).populate("cart.food");

  if (!existingUser) {
    throw new ApiError(400, "No Such User Exists");
  }

  const orderArray = existingUser.cart;
  let totalAmount = 0;
  console.log(orderArray);
  const order = orderArray.map((curEle) => {
    totalAmount += curEle.food.price * curEle.quantity;
    return { food: curEle.food._id, quantity: curEle.quantity };
  });

  const obj = {
    table: _id,
    order,
    totalAmount,
  };

  const orderCreated = await Order.create(obj);
  existingUser.cart = [];
  await existingUser.save();
  const createdOrder = await Order.findById(orderCreated._id).populate([
    {
      path: "table",
      select: "username _id",
    },
    {
      path: "order.food",
    },
  ]);
  io.emit("order-placed", { order: createdOrder });
  res.json(new ApiSuccess(200, "Order Placed Successfully", createdOrder));
});

export const fetchAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find().populate([
    {
      path: "table",
      select: "username _id",
    },
    {
      path: "order.food",
    },
  ]);

  res.json(new ApiSuccess(200, "All Orders fetched", allOrders));
});

export const fetchSheffOrder = asyncHandler(async (req, res) => {

  const date = new Date();
  const allOrders = await Order.find({
    status: { $in: ["pending", "processing"] },
  }).populate([
    {
      path: "table",
      select: "username _id",
    },
    {
      path: "order.food",
    },
  ]);

  res.json(new ApiSuccess(200, "All Orders fetched", allOrders));
});
