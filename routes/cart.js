// const express = require("express");
// const router = express.Router();
// const CryptoJS = require("crypto-js");
// const Cart = require("../models/Cart");
// const {verifyToken} = require("./verifyToken");

// //CREATE
// router.post('/',async (req, res) => {
//     try {
//         const cart = await Cart.create(req.body);
//         res.status(200).send(cart);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// //UPDATE
// router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
//     try {
//         const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
//             $set: req.body
//         },{new:true});
//         res.status(200).send(updatedCart);
//     } catch (error) {
//         res.statusMessage(500).send(err);
//     }
// });

// //DELETE
// router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
//     try {
//         await Cart.findByIdAndDelete(req.params.id);
//         res.status(200).send("Product has been Deleted");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

// //GET USER PRODUCT
// router.get("/find/:userId",verifyTokenAndAuthorization,async (req,res)=>{
//     try {
//         const cart = await Cart.findOne({
//             userId : req.params.userId
//         });
//         res.status(200).send(cart);
//     } catch (error) {
//         console.log
//         res.status(500).send(error);
//     }
// });

// //GET ALL
// router.get("/",verifyTokenAndAdmin,async (req,res)=>{
//     try {
//         const carts = await Cart.find();
//         res.status(200).send(carts);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// module.exports = router;

