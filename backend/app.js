import express from "express"
import {config} from "dotenv"
import { dbConnection } from "./database/dbConnection.js";
import employeeRouter from "./router/employeeRouter.js"
import adminRouter from "./router/adminRouter.js";
import productRouter from "./router/productRouter.js";
import billRouter from "./router/billRouter.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

config({path : "./config/config.env"})


app.use(cors({
    origin: '*'
}))



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended :true}));

app.use("/api/v1/product", productRouter)
app.use("/api/v1/employee" , employeeRouter)
app.use("/api/v1/admin" , adminRouter)
app.use("/api/v1/bill" , billRouter);
dbConnection()

export default app