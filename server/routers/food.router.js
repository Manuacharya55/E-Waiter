import express from "express";
import {
  addFood,
  editFood,
  getAllFood,
  handleFoodActivate,
} from "../controllers/food.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyUser, getAllFood)
  .post(verifyUser, verifyAdmin, addFood);

router.route("/:id").patch(verifyUser, verifyAdmin, editFood);

router
  .route("/active-status/:id")
  .patch(verifyUser, verifyAdmin, handleFoodActivate);

export default router;
