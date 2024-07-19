import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    uniqueid:{
        type: String,
        required: true,
        unique: true

    },
    name: {
        type: String,
        required: true 
    },
    brand: {
        type: String,
        required: true  
    },
    color: {
        type: String,
        required: true  
    },
    qty: {
        type: Number,
        required: true  
    },
    price: {
        type: Number,
        required: true  
    },
    size:{
        type: String,
        
    }
});

export const Product = mongoose.model("Product", productSchema);
