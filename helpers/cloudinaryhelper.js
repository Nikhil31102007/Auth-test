import cloudinary from "../config/cloudinary.js";

const upload_to_cloudinary =async (filepath)=>{
    try {
        const result = await cloudinary.uploader.upload(filepath);
    
        return {
            url : result.secure_url,
            publicId : result.public_id
        }

    } catch (error) {
        console.error("ERROR WHILE UPLOADING TO CLOUDINARY : ",error)
        throw new Error('ERROR WHILE UPLOADING TO CLOUDINARY')
    }
}

export default upload_to_cloudinary;