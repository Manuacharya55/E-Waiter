import express from "express";
import { handleActivate, listUsers, loginTable, registerTable } from "../controllers/auth.conntroller.js";
import { verifyUser, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(verifyUser,verifyAdmin,registerTable);
router.route("/list-users").get(verifyUser,verifyAdmin,listUsers);
router.route("/login").post(loginTable);
router.route("/active-status/:id").patch(verifyUser,verifyAdmin,handleActivate);

export default router;