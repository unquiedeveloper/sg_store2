import { Product } from "../models/productSchema.js";

export const createProduct = async (req, res, next) => {
    const { uniqueid, name, brand, color, qty, price, size } = req.body;

    if (!uniqueid || !name || !brand || !color || !qty || !price || !size) {
        return res.status(400).json({
            success: false,
            message: "Provide full info"
        });
    }

    try {
        const product = await Product.create({ uniqueid, name, brand, color, qty, price, size });
        res.status(200).json({
            success: true,
            message: "Product created successfully!!!",
            product
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({
                success: false,
                message: "Unique ID already exists. Please provide a different Unique ID."
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { uniqueid, name, brand, color, qty, price, size } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { uniqueid, name, brand, color, qty, price, size },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Product updated!',
            product: updatedProduct
        });
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            return res.status(400).json({
                success: false,
                message: "Unique ID already exists. Please provide a different Unique ID."
            });
        }
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: 'Product deleted!'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


export const getproduct = async (req, res, next) => {
    const {id} = req.params
    const product= await Product.findById(id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Employee not found"
        });
    }
    res.status(200).json({
        success: true,
       product 
    });
};



