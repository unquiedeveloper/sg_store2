import express from "express"
import { adminLogin, adminRegister, deleteAdmin, getAdmin, getallAdmin, updateAdmin } from "../controller/adminController.js";
import { createProduct, deleteProduct, getproduct, getProducts, updateProduct } from "../controller/productController.js";


const router = express.Router();


router.post("/register" ,  adminRegister);
router.post("/login", adminLogin);
router.put("/me/update/:id"  , updateAdmin);
router.get("/getall" ,  getallAdmin);
router.get("/me/:id" , getAdmin);
router.post("/addproducts"  , createProduct);
router.get("/product/me/:id" ,  getproduct);
router.delete("/products/:id" , deleteProduct);
router.put("/products/:id" , updateProduct);
router.delete("/delete/:id" , deleteAdmin );
router.get("/products/all" , getProducts);



export default router 