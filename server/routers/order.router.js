import express from "express";
import {
  fetchAllOrders,
  fetchSheffOrder,
  orderFood,
} from "../controllers/order.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(verifyUser, orderFood)
  .get(verifyUser, verifyAdmin, fetchAllOrders);

router.route("/shef-order").get(verifyUser, fetchSheffOrder);

export default router;
