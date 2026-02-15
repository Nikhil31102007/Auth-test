import Image from "../models/Image.js"
import upload_to_cloudinary from "../helpers/cloudinaryhelper.js"

const upload_img  =async (req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({
                success : false ,
                message : 'File is required upload a file!!'
            })
        } else {
            const {url,publicId} = await upload_to_cloudinary(req.file.path)
        //we will store the url and public id and uploader user id 
        const newly_Uploaded_img = new Image ({
            imageurl : url ,
            publicId,
            uploadedby : req.userinfo.user_id
        });

        await newly_Uploaded_img.save();

        res.status(201).json({
            success :true ,
            message : 'Image Uploaded!!',
            image_details : newly_Uploaded_img
        })

        }
    } catch (error) {
        console.error("There was an error : ",error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    }
}
//getting images

const get_img = async(req,res)=>{
    try {
        
        const page = parseInt(req.query.page)||1;
        const limit = parseInt(req.query.limit) || 3;
        const skip =(page-1)*limit;

        const totalImages = await Image.countDocuments();
        const sortBy = req.query.sortBy || 'createdAt';

        const sortOrder =  req.query.sortOrder === 'asc' ? 1 : -1;;

        const sort_obj = {};
        
        sort_obj[sortBy] = sortOrder;
        //while going into mongo it will ask to give some sorted order of 
        //the property which is inside [] which is createdAt by default
        //is now sorted on the value which comes from sortby 
        // CreatedAt : 1/-1
        
        const get_images = await Image.find().sort(sort_obj).skip(skip).limit(limit); 

        const totalpages = Math.ceil(totalImages/limit);

        res.status(200).json({
            message : "take ya images!! nigger",
            images : get_images,
            page_no : page,
            limit : limit,
            skip : skip,
            totalimages : totalImages,
            totalpages : totalpages

        })

    } catch (error) {
        console.error("There was an error : ",error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    }
}

const delete_img = async(req,res)=>{
    try {
        
        const {img_id}=req.body;

        if (!img_id) {
            res.status(404).json({
                message : "must  be attched in the header "
            });
        } 

        const img_from_db = await Image.findById(img_id);

        if(!img_from_db){
            res.status(404).json({
                message : "no image of this id",
            });
        }

        await Image.findByIdAndDelete(img_id);

            res.status(200).json({
                message : "image deleted succesfully "
            });

    } catch (error) {
        
        console.error("There was an error : ",error);
        return res.status(500).json({
        success: false,
        message: "Internal server error from img controller"
        });
    }
}


export default {
    upload_img,get_img,delete_img
};