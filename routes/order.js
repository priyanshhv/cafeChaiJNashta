const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const Order = require("../models/Order");
const {verifyToken} = require("./verifyToken");

//CREATE
router.post('/',async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).send(updatedOrder);
    } catch (error) {
        res.statusMessage(500).send(err);
    }
});

//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send("Product has been Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
})

//GET USER ORDERS
// router.get("/find/:userId",verifyToken,async (req,res)=>{
//     try {
//         const orders = await Order.find({
//             userId : req.params.userId
//         });
//         res.status(200).send(orders);
//     } catch (error) {
//         console.log
//         res.status(500).send(error);
//     }
// });

//GET ALL
router.get("/",verifyToken,async (req,res)=>{
    try {
        const query = req.query.new;
        const orders = query ? await Order.find().limit(10).sort({_id:-1}) : await Order.find();      
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/income",verifyToken,async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth()-1));

    try {
        const income = await Order.aggregate([
            {
                $match: { 
                    createdAt:{
                        $gte : previousMonth
                    }
                }
            },
            {
                $project: {
                    month: {
                        $month: "$createdAt"
                    },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    totalSales: {
                        $sum: "$sales"
                    }
                }
            }
        ]);
        res.status(200).send(income);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;

