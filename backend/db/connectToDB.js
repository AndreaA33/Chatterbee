import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.mogodb_URI)
        console.log("connected to database")
    } catch (error){
        console.log("failed connecting to database")
    }
}

export default connectToDB