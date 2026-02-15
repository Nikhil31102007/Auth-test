import mongoose from "mongoose";


//
const Connect_to_db =async()=>{
    await mongoose.connect('mongodb+srv://nikhil20073110_db_user:M4mNODQ0UDqwh13j@authdb.ss6z1p5.mongodb.net/')
    .then(
        console.log("Connceted to mongo db!!!")
    ).catch((err)=>{
        console.error("there was some error and connection to mongo failed !! ---> ",err)
    })
}

export default Connect_to_db;  