import express from "express";
import { verifyAdmin, verifyUser } from "../middleware/auth.middleware.js";
import { dashboard } from "../controllers/dashboard.controller.js";

const router = express.Router()

router.route("/").get(verifyUser,verifyAdmin,dashboard)

export default router;