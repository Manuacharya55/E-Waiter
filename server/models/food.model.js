import { Schema, model } from "mongoose";

const foodSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  foodtype: {
    type: String,
    required: true,
    enum: ["breakfast", "dinner", "lunch", "snacks"],
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Food = model("Food",foodSchema)
export default Food;