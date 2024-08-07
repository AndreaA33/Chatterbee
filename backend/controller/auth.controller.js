import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js";


export const login = async (req,res) =>{
    try{
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        const isPasswordCorrect =  await bcryptjs.compare(password, user?.password || "")

        if (!user, !isPasswordCorrect){
            res.status(400).json({error: "Invalid credentials"});
        }

        generateToken(user._id,res)
        res.status(201).json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            profilepic: user.profilepic
        });



    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}


export const register = async (req, res) => {
    try {
        const { fname, lname, username, password } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password,salt)

        const profilepic = `https://avatar.iran.liara.run/username?username=${fname}+${lname}`;


        const newUser = new User({
            fname,
            lname,
            username,
            password: hashpassword,
            profilepic
        });

        generateToken(newUser._id,res)
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fname: newUser.fname,
            lname: newUser.lname,
            username: newUser.username,
            profilepic: newUser.profilepic
        });

    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};


export const logout = async (req,res) =>{
    try {
        res.cookie("jwt-token", "", {maxAge: 0})
        res.status(200).json({message: "Logged out"})
        
    } catch (error) {
        console.error("Logout error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}