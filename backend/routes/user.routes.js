import express from "express";
import { getusers } from "../controller/users.controller.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()

router.get("/", protectRoute ,getusers)

export default router