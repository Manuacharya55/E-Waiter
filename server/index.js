import express from "express"
import cors from "cors"
import { connectDB } from "./DB/db.js"
import { errorHandler } from "./middleware/error.middleware.js"


import authRouter from "./routers/auth.router.js"
import foodRouter from "./routers/food.router.js"
import cartRouter from "./routers/cart.router.js"
import orderRouter from "./routers/order.router.js"
import dashboardRouter from "./routers/dashboard.router.js"


const app = express()
app.use(cors())
app.use(express.json())


connectDB();

app.get("/",(req,res)=>{
    throw new ApiError(400,"cannot access")
})


app.use(errorHandler);

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/food",foodRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/dashboard",dashboardRouter)

app.listen(4000,()=>{
    console.log("server started at 4000")
})