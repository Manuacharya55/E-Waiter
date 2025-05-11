import { Schema, model } from "mongoose";

const orderSchema = Schema({
  table: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  order: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Food",
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: Boolean,
    enum: ["pending", "paid"],
    default: "pending",
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = model("Order", orderSchema);
export default Order;
