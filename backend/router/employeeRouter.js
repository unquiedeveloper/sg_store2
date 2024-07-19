import express from "express"
import { deleteEmployee, getallEmployee, getEmployee, login,   register, updateEmployee } from "../controller/employeeController.js";


const router = express.Router();

router.post("/register" ,  register);
router.post("/login", login);
router.get("/me/:id",  getEmployee);
router.put("/me/update/:id"  , updateEmployee);
router.delete("/me/:id"  , deleteEmployee);
router.get("/getall" , getallEmployee);

export default router;