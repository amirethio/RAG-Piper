import express from "express";
import * as authController from "./../controllers/auth/index.js";

const router = express.Router()




//* ROUTES
router.post("/register", authController.register);
router.post("/login", authController.login);
// Router.post("/refresh", authController.refresh);
router.get("/logout", authController.logout);

export default router;
