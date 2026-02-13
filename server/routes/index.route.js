import express from "express";
import auth from './auth.route.js'
import admin from './admin.routes.js'
import chat from "./chat.routes.js";



const router = express.Router()




//* ROUTES
router.use("/auth", auth);
router.use("/admin" ,  admin);
router.use("/chat", chat);



export default router;
