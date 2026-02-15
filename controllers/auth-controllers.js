import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { get } from "mongoose";


const checkExistingUser = async ({ username, email }) => {
    if (!username && !email) return null;

    const query = [];

    if (username) query.push({ username });
    if (email) query.push({ email });

    return await User.findOne({ $or: query });
};
const register_user = async (req,res)=>{
    try {

        //all the parameters wil be passe dto request and we can access them form therre!!
        //these parameters can alos be given while backend testing 
        //in postman
        const {username,email,password,role} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            });
        }

        const log_user = await User.findOne({
            $or: [{ username }, { email }]
        });




        //if the user already exists then we just send back

        if (log_user) {
            res.status(400).json({
                succes : false,
                message : "THE USER WITH THIS CREDENTIALS ALREADAY EXISTS!!!",
            });

            //while returning a json add ; at end or it will never end!!

        } else {

            //if user is bieng registered then we will hash the passwords 
            //and now we will go further of it!!!

            const salt =await bcrypt.genSalt(10);

            const hashedPassword =await bcrypt.hash(password,salt)

            const newlyCreatedUser = new User({
                username,
                email,
                password : hashedPassword,
                role : role || 'user'
            })

            await newlyCreatedUser.save();

            if (newlyCreatedUser) {
            res.status(201).json({
                succes : true,
                Message : "USER REGISTERED SUCCESFULLY!!",
                User : newlyCreatedUser
            });
            } else {
                res.status(400).json({
                succes : false,
                Message : "USER COULD NOT BE REGISTERED!!"
            });
            }
        }
    } catch (error) {
        console.error("There was an error : ",error)
    
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });

    }
}

// const login_user =async (req,res)=>{
//     try {
        
//         const {username,email,password}=req.body;

//             if (!password || (!username && !email)) {
//             return res.status(400).json({
//                 message: "Username or email and password required"
//             });
//         }

//         const log_user = await User.findOne({
//             $or: [{ username }, { email }]
//         });

//         if (log_user) {

//             console.log(log_user.password);

//             const unhashed_password =await bcrypt.compare(password,log_user.password);


//             if (unhashed_password) {
//                 res.status(200).json({
//                     message : "logged in success fully and now access other stuff!!!",
//                     user : log_user
//                 });
//             } else {
//                 res.status(401).json({
//                     message : "The passowrd is invalid!!!"
//                 });
//             }

//         } else {
//             res.status(404).json({
//                 message : "The user with this credentials is not found try registering !!"
//             });
//         }


//     } catch (error) {
//         console.error("There was an error : ",error);

//     return res.status(500).json({
//         success: false,
//         message: "Internal server error"
//     });
//     }
// }
// this is an working but very unsytematic way of 
// creating login system we will do other one!!

const login_user =async (req,res)=>{
//checking if the user already exists or not 

    try{const {username,password} = req.body;

    //if user exists or not

    const user = await User.findOne({
        username
    })

    if (user) {
        
        //match passwords

        const isPassword_ok = await bcrypt.compare(password,user.password);

        //generating tokens!!
        //we will use json web tokenm to generate the tokens we need 

        if(!isPassword_ok){
            res.status(404).json({
                message: "your password is incorrect nigger!!!!"
            })
        }

        const access_token =jwt.sign({
            user_id : user._id,
            username : user.username,
            role : user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn : '60m'
        })

        res.status(200).json({
            succes : true,
            message : "Logged in successfully",
            access_token : access_token
        });

    } else {
            res.status(404).json({
                message : "User Doesnt exists!!"
            });
    }}catch(error){
        console.error("There was an error : ",error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

}

const change_password = async (req,res)=>{
    try {
        const {oldpassword,newpassword}=req.body;

        const getting_userfromDB =await User.findById(req.userinfo.user_id);

        if(!getting_userfromDB){
            res.status(404).json({
                message : "User not found to be registered!!",
            })
        }

        const hashedPassword =getting_userfromDB.password;

        const verifypassword =await bcrypt.compare(oldpassword,hashedPassword);

        if (verifypassword) {
            if(newpassword ===oldpassword){
                    res.status(400).json({
                message : "Old Password must not be equal to new one",
            })
            }
            const salt = await bcrypt.genSalt(10);
            const new_hashed_pass =await bcrypt.hash(newpassword,salt);

            console.log("new hashedpass : ", new_hashed_pass);

            getting_userfromDB.password =new_hashed_pass;

            await getting_userfromDB.save()

            res.status(201).json({
                message : "Change password successfull",

            })

        } else {
            res.status(401).json({
                messager : "THE OLD PASSWORD IS INCORRECT!!!"
            });
        
        }

    } catch (error) {
        
        console.error("There was an error : ",error);
        
        return res.status(500).json({
        success: false,
        message: "Internal server error"
        });
    }
}

export default {
    register_user,
    login_user,
    change_password
}