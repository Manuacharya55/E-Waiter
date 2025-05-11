import express from "express";
import { handleActivate, loginTable, registerTable } from "../controllers/auth.conntroller.js";
import { verifyUser, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(verifyUser,verifyAdmin,registerTable);
router.route("/login").post(loginTable);
router.route("/active-status/:id").patch(verifyUser,verifyAdmin,handleActivate);

export default router;