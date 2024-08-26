import express from "express";
import { getusersinconv, getuser } from "../controller/users.controller.js"
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router()

router.get("/", protectRoute ,getusersinconv)

router.post("/getuser", protectRoute ,getuser)

export default router