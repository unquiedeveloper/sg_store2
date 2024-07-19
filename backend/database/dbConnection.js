import mongoose from "mongoose"


export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL , {
         dbName: "sgstore2"
    }).then(()=>{
        console.log("connection successfyll!");
    }).catch((err)=>{
        console.log(`connection failed ${err}`);
    })
}