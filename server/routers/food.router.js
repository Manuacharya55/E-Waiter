import express from "express";
import {
  addFood,
  editFood,
  getAllFood,
  getSingleFood,
  handleFoodActivate,
} from "../controllers/food.controller.js";
import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyUser, getAllFood)
  .post(verifyUser, verifyAdmin, addFood);


router
  .route("/active-status/:id")
  .patch(verifyUser, verifyAdmin, handleFoodActivate);
  

router
  .route("/:id")
  .get(verifyUser, verifyAdmin, getSingleFood)
  .patch(verifyUser, verifyAdmin, editFood);



export default router;
