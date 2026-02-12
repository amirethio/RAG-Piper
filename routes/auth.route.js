import express from "express";
import * as authController from "./../controllers/auth/index.js";

const router = express.Router()




//* ROUTES
router.post("/register", authController.register);
// Router.post("/login", authController.login);
// Router.post("/refresh", authController.refresh);
// Router.post("/logout", authController.logout);

export default router;
