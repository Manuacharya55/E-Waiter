import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import Order from "../models/order.model.js";
import ApiSuccess from "../utils/ApiSuccess.js";
import { io } from "../index.js";

const dates_calculated = () => {
  const date = new Date();
  const startoftheDay = new Date(date);
  startoftheDay.setUTCHours(0, 0, 0, 0);

  const endoftheDay = new Date(date);
  endoftheDay.setUTCHours(23, 59, 59, 999);

  return { startoftheDay, endoftheDay };
};

export const orderFood = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const existingUser = await User.findById(_id).populate("cart.food");

  if (!existingUser) {
    throw new ApiError(404, "No Such User Exists");
  }

  const orderArray = existingUser.cart;
  let totalAmount = 0;
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

export const fetchTodaysOrders = asyncHandler(async (req, res) => {
  const { startoftheDay, endoftheDay } = dates_calculated();
  const allOrders = await Order.find({
    orderedAt: {
      $gte: startoftheDay,
      $lte: endoftheDay,
    },
    paymentStatus: { $ne: "paid" },
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

export const fetchSheff_WaiterOrder = asyncHandler(async (req, res) => {
  const { startoftheDay, endoftheDay } = dates_calculated();
  const array =
    req.user.role == "sheff" ? ["pending", "processing"] : ["processed"];

  const allOrders = await Order.find({
    status: { $in: array },
    orderedAt: {
      $gte: startoftheDay,
      $lte: endoftheDay,
    },
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

export const update_Order_Status = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedData = await Order.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(404, "No Such Data");
  }

  const order = await Order.findById(id).populate([
    {
      path: "table",
      select: "username _id",
    },
    {
      path: "order.food",
    },
  ]);

  io.emit("order-status-updated", { data: order });
  if (status == "processed") {
    io.emit("waiter-status-updated", { data: order });
  }
  res.status(200).json(new ApiSuccess(200, "Updated Data Successfully", order));
});

export const update_Payment_Status = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const updatedData = await Order.findByIdAndUpdate(
    id,
    { $set: { paymentStatus : status } },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(404, "No Such Data");
  }

  const order = await Order.findById(id).populate([
    {
      path: "table",
      select: "username _id",
    },
    {
      path: "order.food",
    },
  ]);

  res.status(200).json(new ApiSuccess(200, "Updated Data Successfully", order));
});