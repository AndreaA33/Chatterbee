import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;


        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const isPasswordCorrect =  await bcryptjs.compare(password, user?.password || "")


        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }


        generateToken(user._id, res);
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
};

export const register = async (req, res) => {
    try {
        const { fname, lname, username, password } = req.body;

        if (fname == "" || lname == "" || username == "" || password == "" ){
            return res.status(400).json({ error: "missing fields" });
        } else if (password.length < 6){
            return res.status(400).json({ error: "password not long enough" });
        }


        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const profilepic = `https://avatar.iran.liara.run/username?username=${fname}+${lname}`;

        const newUser = new User({
            fname,
            lname,
            username,
            password: hashedPassword,
            profilepic
        });

        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fname: newUser.fname,
            lname: newUser.lname,
            username: newUser.username,
            profilepic: newUser.profilepic
        });


    } catch (error) {
        console.error("Register error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};


export const logout = async (req,res) =>{
    try {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out"})
        
    } catch (error) {
        console.log("Logout error:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}