import express from "express";
import {
  fetchAllOrders,
  fetchSheff_WaiterOrder,
  fetchTodaysOrders,
  orderFood,
  update_Order_Status,
  update_Payment_Status,
} from "../controllers/order.controller.js";
import {
  verifyAdmin,
  verifySheff,
  verifyUser,
  verifyWaiter,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(verifyUser, orderFood)
  .get(verifyUser, verifyAdmin, fetchAllOrders);

router.route("/todays-orders").get(verifyUser, verifyAdmin, fetchTodaysOrders);

router
  .route("/sheff-order")
  .get(verifyUser, verifySheff, fetchSheff_WaiterOrder);

router
  .route("/waiter-order")
  .get(verifyUser, verifyWaiter, fetchSheff_WaiterOrder);

router.route("/update-status/:id").patch(verifyUser, update_Order_Status);

router
  .route("/update-payment-status/:id")
  .patch(verifyUser, verifyAdmin, update_Payment_Status);

export default router;
