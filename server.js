import express from "express";
import Connect_to_db from "./database/database.js";
import dotenv from "dotenv";
import router from "./routes/Router.js";
import img_router from "./routes/img-routes.js";
const app =express();
dotenv.config();



const port =process.env.PORT||3000;

Connect_to_db();

app.use(express.json())

app.use("/auth",router);

app.use("/files",img_router);


app.get("/",(req,res)=>{
    res.json({
        message : "testing the auth backend!!"
    })
})

app.listen(port,()=>{
    console.log("Server is listening on port : ",port);
})
