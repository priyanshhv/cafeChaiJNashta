const express = require("express")
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cors = require("cors")

dotenv.config()

//Connecting Database
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connection successful"))
.catch(e=>console.log(e))

//Middlewares
app.use(express.json())

app.use(cors({
    origin: " http://localhost:5173"
}))

//Routes
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/order",orderRoute);

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})