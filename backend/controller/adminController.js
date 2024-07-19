import { Admin } from "../models/adminSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminRegister = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
        return res.status(400).json({
            success: false,
            message: "Please provide full info"
        });
    }

    const isAdmin = await Admin.findOne({ email });
    if (isAdmin) {
        return res.status(400).json({
            success: false,
            message: "Admin already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hashedPassword, phone, role });

    res.status(200).json({
        success: true,
        message: "Admin registered successfully!",
        admin
    });
};

export const adminLogin = async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Please provide full info"
        });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(400).json({
            success: false,
            message: "Admin not Found"
        });
    }
    const isPassword = await bcrypt.compare(password, admin.password);

    if (!isPassword) {
        return res.status(400).json({
            success: false,
            message: "Entered Wrong Password.."
        });
    }

    if (role !== admin.role) {
        return res.status(400).json({
            success: false,
            message: "Admin with this role not found"
        });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET2, {
        expiresIn: process.env.JWT_EXPIRES
    });
    var adminObj = admin.toObject();
    adminObj.token = token;
    // admin.token=token;
    adminObj.password = undefined;

    res.status(200).json({
        success: true,
        message: "Admin logged in successfully!",
        adminObj
    });
};




export const getallAdmin = async (req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json({
            success: true,
            admin
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getAdmin = async (req, res, next) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Admin not found"
        });
    }
    res.status(200).json({
        success: true,
        admin
    });
};


export const updateAdmin = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            id,
            { name, email, phone, password },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Admin  updated!',
            admin: updatedAdmin
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

export const deleteAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Admin.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Admin deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}