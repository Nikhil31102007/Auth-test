import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
//
const Connect_to_db =async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(
        console.log("Connceted to mongo db!!!")
    ).catch((err)=>{
        console.error("there was some error and connection to mongo failed !! ---> ",err)
    })
}

export default Connect_to_db;  