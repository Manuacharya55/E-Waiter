import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "table",
    enum:["admin","table","sheff","waiter","user"]
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  cart: [
    {
      food: {
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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({
    _id : this._id,
    role : this.role,
    username : this.username
  },"jwt-secret")

  return token
};

const User = model("User", userSchema);
export default User;
