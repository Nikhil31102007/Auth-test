import { Router } from "express";
import express from "express";
import auth_controllers from "../controllers/auth-controllers.js";
import authmiddleware from "../middlewares/authmiddleware.js";
import admin_middleware from "../middlewares/admin-middleware.js";
const router = express.Router();
const username =`name1 ${Math.floor(Math.random()*1902+882)}`;
const password = `password1${Math.floor(Math.random()*1902+882)}`

const email = `mail1${Math.floor(Math.random()*1902+882)}`;

router.get("/",(req,res)=>{
    res.json({
        message : "the router is open!!!"
    })
})

router.get("/authreq",authmiddleware,(req,res)=>{
    res.json({
        message : "this is authenticated only page only works if the middleware is passed!!",
        user_info :req.userinfo
    });
})

router.get("/admin",authmiddleware,admin_middleware,(req,res)=>{
    console.log("at routes page")
    res.json({
        message : "this is the admin page !!!"
    });
})

router.put("/changepass",authmiddleware,auth_controllers.change_password);

router.post("/register",auth_controllers.register_user);


router.get("/login",auth_controllers.login_user);

export default router; 