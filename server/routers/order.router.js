import express from "express";
import { fetchAllOrders, orderFood } from "../controllers/order.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(verifyUser, orderFood)
  .get(verifyUser, verifyAdmin, fetchAllOrders);

export default router;
