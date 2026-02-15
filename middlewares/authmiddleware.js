import jwt from 'jsonwebtoken';

//now we will use middleware top keep unauthenticated user to stay away from the 
//part thwey are not allowed
const authmiddleware = (req,res,next)=>{

    try {
            console.log('Auth middleware is callled');
    
    const auth_header = req.headers["authorization"];

    if (!auth_header) {
        res.status(404).json({
            message : "The header not found in the request!!"
        });
    } 

    console.log(auth_header);

    //the response of the token is bearer -----some string------
    //now we split it into an array of two member whois first member will be "bearer " and second "--some token--"
    //we are choposing hte token part now so that we can get the token
    const token = auth_header && auth_header.split(" ")[1];

    const decode_token_info =jwt.verify(token,process.env.JWT_SECRET_KEY)

    if(!token){
        res.status(401).json({
            message : "Acces denied --->Please login !!!"
        });
    }


    req.userinfo =decode_token_info;
    //every time we run this middle ware it will give request in form of object nown as user info and from there we will be able toi 
    //authourise if person can access the info or not cause it takes the access tokens as and decodes them to get info every tme thisw will be used
    //middle ware we will  be able to access user info from request directly 
    console.log("info from auth middliware decoding the token : ",req.userinfo);

    next();
    } catch (error) {
    console.error("There was an error : ",error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    } 
}

export default authmiddleware;