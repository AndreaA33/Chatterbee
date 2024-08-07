import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_Token, {expiresIn: '15d'})
    
    res.cookie("jwt-token", token, {
        maxAge: 15 * 60 * 60 * 60 * 1000, //This is in milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateToken