import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/E-Waiter");
        console.log("DataBase connected successfully")
    } catch (error) {
        console.log("Couldnt Connect Data Base");
        console.log(error.message)
    }
}

