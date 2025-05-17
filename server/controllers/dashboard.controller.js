import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js"
import Food from "../models/food.model.js"
import Order from "../models/order.model.js"
import ApiSuccess from "../utils/ApiSuccess.js";

export const dashboard = asyncHandler(async (req, res) => {
    const existingUser = await User.find({role : {$ne : "admin"}})
    const existingReciepe = await Food.find();
    const orders = await Order.aggregate([
  {
    $group: {
      _id: null,
      totalAmount: { $sum: "$totalAmount" },
      totalOrders: { $sum: 1 }
    }
  }
]);

    const data = {
        user : existingUser.length,
        reciepe : existingReciepe.length,
        orders 

    }

    res.json(new ApiSuccess(200,"Data Fetched Successfully",data))
});
