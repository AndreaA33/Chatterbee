import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token){
            res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_Token)

        if (!decoded){
            res.status(401).json({ error: "Invalid token" });
        }
        
        const user = await User.findById(decoded.userId).select("-password");

        req.user = user

        next()

    } catch (error) {
        console.error("Protector middlware rout error", error.message);
        res.status(500).json({ error: "Server error" });
    }
}

export default protectRoute;