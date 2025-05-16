import express from "express"
import { addItem, clearCart, loadCart, removeItem } from "../controllers/cart.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";


const router = express.Router();

router.route("/fetch-cart").get(verifyUser,loadCart)
router.route("/clear-cart").get(verifyUser,clearCart)
router.route("/add/:id").post(verifyUser,addItem)
router.route("/remove/:id").post(verifyUser,removeItem)

export default router