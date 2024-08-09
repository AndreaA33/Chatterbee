import express from "express";
import { sendmessage, getmessage } from "../controller/messages.controller.js"
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router()

router.post("/send/:id", protectRoute, sendmessage)
router.get("/:id", protectRoute, getmessage)


export default router