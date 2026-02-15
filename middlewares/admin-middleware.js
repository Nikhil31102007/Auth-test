
const admin_middleware=(req,res,next)=>{
    try {

        console.log("admin called")
        if (req.userinfo.role!=='admin') {
            res.status(401).json({
                message : "you are not authorised for this page ",
            });

        }
            next();
    } catch (error) { 
    console.error("There was an error : ",error);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
    }
}

export default admin_middleware;