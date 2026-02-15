import mongoose from "mongoose";

//the level of user will be setted wihtin the db manually based on info 
//

const User_schema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase :true,
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    role : {type: String, 
        default : "User_level_1",
        enum : ["user","admin"],
    }
},{timestamps : true})

const User =new  mongoose.model("User",User_schema);

//trim --->removes leading and trailing white space before and after the input !!
//timestamp --->automatically stores the Created at and Updatd at parameter in Date format

export default User;