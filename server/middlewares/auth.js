const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User")
//auth

exports.auth =async(req,res,next)=>{

    try {
        // console.log("here riched");
        // console.log(req);
        //extract tok
        const token=req.cookies.token 
                    ||req.body.token 
                    || req.header("Authorization").replace("Bearer ","");

                    // if token missing, then return response
                    // console.log("here riched 1");

                    if(!token){
                        return res.status(401).json({
                            success:false,
                            message:"Token is missing",
                        });
                    }
// console.log("Hrere  3");
                    // verify token using secret key

                    try {
                        console.log("hre 4");

                        const decode= await  jwt.verify(token,process.env.JWT_SECRET);
                        console.log("hre 5");
                        console.log(decode);
                        // console.log(decode);
                        // console.log("hree 5",req.user);
                        req.user=decode;
                        console.log("hre6");

                        
                    } catch (error) {
                        return res.status(401).json({
                            success:false,
                            message:"Token Is Invalid"
                        });

                        
                    }
                    next();

    } catch (error) {
        
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the toke "
        })
    }
}



//isStudent

exports.isStudent=async(req,res,next)=>{

    try {

        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student only"
            })

        }
        next();



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again"
        })
        
    }

}


//isInstructor

exports.isInstructor=async(req,res,next)=>{

    try {

        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })

        }
        next();



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again"
        })
        
    }

}

//isAdmin

exports.isAdmin=async(req,res,next)=>{

    try {

        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin only"
            })

        }
        next();



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again"
        })
        
    }

}