import express from "express";

import { Router } from "express";

import uploadMiddleware from "../middlewares/upload-middleware.js";

import authmiddleware from "../middlewares/authmiddleware.js";
import admin_middleware from "../middlewares/admin-middleware.js";
import imagecontroller from "../controllers/image-controller.js";

const img_router = express.Router();

//upload img;

img_router.post("/upload",authmiddleware,admin_middleware,uploadMiddleware.single('image'),imagecontroller.upload_img);
img_router.get("/getimg",authmiddleware,imagecontroller.get_img);
img_router.delete("/deleteimg",authmiddleware,admin_middleware,imagecontroller.delete_img);
//getting img 

export default img_router;