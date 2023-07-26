const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// //Resgister
// router.post("/register",async (req, res) => {
//     const {username,email,password} = req.body;
//     try {
//          const user = await User.create({
//         username : username,
//         email: email,
//         password: CryptoJS.AES.encrypt(password,process.env.CRYPTOPASSSEC),
//     });
//     console.log(user);
//     res.status(201).send(user)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// });

//LOGIN ADMIN
router.post('/login', (req,res)=>{
    const {username} = req.body;
    try {
        if((username!=process.env.ADMINUSERNAME) && (req.body.password!=process.env.ADMINPASSWORD)){
        return res.status(401).send("Wrong credentials");
        }

        //LOGIN IS COMPLETED SO USING JWT
        const accessToken = jwt.sign({
            id: username,
        },
        process.env.CRYPTOPASSSEC,
        {expiresIn:60*60});

        res.status(200).send({accessToken});
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;