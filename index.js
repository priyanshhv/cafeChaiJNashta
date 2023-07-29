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

// app.use(cors({
//     origin: " https://cafechainashta.onrender.com/"
// }))

 app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Credentials', false);
      next();
    });

//Routes
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/order",orderRoute);

app.listen(process.env.PORT||3000,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})