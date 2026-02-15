import mongoose from "mongoose";

//generating a image model which will be uploaded 
//from admin!!


const ImageSchema = new mongoose.Schema({
    imageurl : {
        type : String,
        required : true,},
        publicid: {
            type : String,
            reqired : true 
        },
        uploadedby : {
            //explained later
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    
})

const Image = new mongoose.model("Image",ImageSchema)

export default Image