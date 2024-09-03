import express from "express"
import path from "path"
import dotenv from "dotenv"
import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToDB from "../backend/db/connectToDB.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from "./socket/socket.js"
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

dotenv.config();

const port = process.env.PORT 

const __dirname = path.resolve()


app.get("/", (req,res) => {
    res.send("App is Working");
});



app.use(express.json())
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    }));

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoutes)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
const storage = new CloudinaryStorage({
cloudinary: cloudinary,
params: {
    folder: 'chat_images',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif']
},
});
  
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      res.json({ imageUrl: req.file.path });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})


server.listen(port, () => {
    connectToDB()
    console.log(`Server running on port ${port}`)
})