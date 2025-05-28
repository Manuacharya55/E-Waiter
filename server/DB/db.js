import mongoose from "mongoose"

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DataBase connected successfully")
    } catch (error) {
        console.log("Couldnt Connect Data Base");
        console.log(error.message)
    }
}

