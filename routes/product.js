const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const Product = require("../models/Product");
const {verifyToken} = require("./verifyToken");

//CREATE
router.post('/', verifyToken,async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.statusMessage(500).send(err);
    }
});

//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).send("Product has been Deleted");
    } catch (error) {
        res.status(500).send(error);
    }
})

//GET PRODUCT
router.get("/find/:id",async (req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        console.log
        res.status(500).send(error);
    }
});

//GET ALL PRODUCTS
router.get("/",async (req,res)=>{
    try {
        const qNew = req.query.new;
        const qCategory = req.query.category;
        
        if(qNew){
            products = await Product.find().sort({createdAt:-1}).limit(4);
        }
        else if(qCategory){
            products = await Product.find({
                categories : {
                    $in : [qCategory]
                }
            });
        }
        else{
            products = await Product.find();
        }
        
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

