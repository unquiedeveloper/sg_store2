import { Bill } from '../models/billSchema.js';
import { Product } from '../models/productSchema.js';

export const createBill = async (req, res) => {
    const { customerName, phoneNumber, address, products } = req.body;

    try {
        let totalAmount = 0;
        const updatedProducts = [];

        for (const product of products) {
            const { uniqueid, quantity } = product;

            // Find product by uniqueid
            const existingProduct = await Product.findOne({ uniqueid });

            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: `Product with uniqueid ${uniqueid} not found`
                });
            }

            // Check if sufficient quantity is available
            if (existingProduct.qty < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient quantity available for product with uniqueid ${uniqueid}`
                });
            }

            // Calculate total amount for the bill
            totalAmount += existingProduct.price * quantity;

            // Reduce product quantity in stock
            existingProduct.qty -= quantity;
            await existingProduct.save();

            // Add product details to the updatedProducts array
            updatedProducts.push({
                uniqueid,
                quantity,
                productname: existingProduct.name,
                price: existingProduct.price
            });
        }

        // Create new bill with updated products
        const newBill = await Bill.create({
            customerName,
            phoneNumber,
            address,
            products: updatedProducts,
            totalAmount
        });

        res.status(201).json({
            success: true,
            message: 'Bill created successfully!',
            bill: newBill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create bill',
            error: error.message
        });
    }
};

export const getallBill = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.status(200).json({
            success: true,
            bills
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteBill = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Bill.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Bill deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};
