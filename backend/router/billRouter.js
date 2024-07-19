import express from "express"
import { createBill, deleteBill, getallBill } from "../controller/billController.js";


const router = express.Router();

router.post("/createBill" , createBill);
router.get("/getall" , getallBill);
router.delete("/delete/:id" , deleteBill);


export default router