import express from "express";
import auth from './auth.route.js'

const router = express.Router()




//* ROUTES
router.use("/auth", auth);
// Router.post("/login", authController.login);
// Router.post("/refresh", authController.refresh);
// Router.post("/logout", authController.logout);

export default router;
