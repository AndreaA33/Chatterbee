import express from "express";
import { sendmessage } from "../controller/messages.controller.js"
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router()

router.post("/send/:id", protectRoute, sendmessage)


export default router