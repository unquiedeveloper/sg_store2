import { Employee } from "../models/employeeSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const { name, email, phone, password, address, role } = req.body;

    if (!name || !email || !phone || !address || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Please provide full info"
        });
    }
    const isEmployee = await Employee.findOne({ email });
    if (isEmployee) {
        return res.status(409).json({
            success: false,
            message: "Email already exists"
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({ name, email, phone, password: hashedPassword, address, role });

    res.status(200).json({
        success: true,
        message: "Employee registered!",
        employee
    });
};

export const login = async (req, res, next) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Please provide full info"
        });
    }

    const employee = await Employee.findOne({ email });
    if (!employee) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    const isPassword = await bcrypt.compare(password, employee.password);
    if (!isPassword) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials!"
        });
    }

    if (role !== employee.role) {
        return res.status(400).json({
            success: false,
            message: "Employee with this role not found"
        });
    }
    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
    
    res.status(200).json({
        success: true,
        message: "Employee logged in",
        employee,
        token
    });
};

export const getEmployee = async (req, res, next) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
        return res.status(404).json({
            success: false,
            message: "Employee not found"
        });
    }
    res.status(200).json({
        success: true,
        employee
    });
};

export const getallEmployee = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({
            success: true,
            employees
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteEmployee = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Employee deleted!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateEmployee = async (req, res, next) => {
    const { id } = req.params;
    const { name, email, phone, password, address } = req.body;

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, phone, password, address },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: 'Employee updated!',
            employee: updatedEmployee
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
