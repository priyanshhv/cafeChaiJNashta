const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    dsesc : {
        type : String,
        required : true,
    },
    img : {
        type : String,
        required : true
    },
    categories : {
        type : Array
    },
    price : {
        type : Number,
        required : true
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Product",productSchema);