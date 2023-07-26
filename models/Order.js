const { default: mongoose, mongo } = require("mongoose");

//here stripe library is going to give object in address so we passs type of Object

const orderSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    products : [
        {
            productId : {
                type : String,
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
    amount : {
        type : Number,
        required : true
    },
    address : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

module.exports = mongoose.model("Order",orderSchema);