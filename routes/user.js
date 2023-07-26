// const express = require("express");
// const router = express.Router();
// const CryptoJS = require("crypto-js");
// const User = require("../models/User");
// const {verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");

// //UPDATE
// router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
//     if(req.body.password){
//        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.CRYPTOPASSSEC)
//     }
//     try {
//         const userUpdated= await User.findByIdAndUpdate(req.params.id,{
//             $set: req.body
//         },{new:true});
//         res.status(200).send(userUpdated);
//     } catch (error) {
//         res.statusMessage(500).send(err);
//     }
// })

// //DELETE
// router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(200).send("User has been Deleted");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

// //GET USER
// router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
//     try {
//         const user = await User.findById(req.params.id);
//         const {password,...others} = user._doc; 
//         res.status(200).send(others);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

// //GET ALL USERS
// router.get("/",verifyTokenAndAdmin,async (req,res)=>{
//     try {
//         const query = req.query.new;
//         const users = query ? await User.find().limit(5).sort({_id:-1}) : await User.find();      
//         res.status(200).send(users);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// //GET USER STATS
// router.get("/stats",verifyTokenAndAdmin,async (req,res)=>{
//     console.log("hit");
//     const date = new Date();
//     const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
//     try {
//         const data = await User.aggregate([
//             {
//                 $match: {
//                     createdAt: { $gte: lastYear }
//                 }
//             },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" }
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: 1 }
//                 }
//             }
//         ]);
      
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// module.exports = router;

