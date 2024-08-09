import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToDB from "../backend/db/connectToDB.js"
import cookieParser from "cookie-parser"


const PORT = process.env.PORT || 5000
const app = express();


app.get("/", (req,res) => {
    res.send("App is Working");
});


dotenv.config();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)
app.use("/api/messages", messageRoute)
app.use("/api/users", userRoutes)



app.listen(PORT, () => {
    connectToDB()
    console.log(`Server running on port ${PORT}`)
})