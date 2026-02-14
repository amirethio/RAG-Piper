import express from "express";
import auth from './auth.route.js'
import admin from './admin.routes.js'
import chat from "./chat.routes.js";
import {verifyJWT} from './../middleware/verifyJWT.middleware.js'
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router()




//* ROUTES
router.use("/auth", auth);
router.use("/admin", verifyJWT, authorizeRoles("admin"), admin);
router.use("/chat",verifyJWT, chat);



export default router;
