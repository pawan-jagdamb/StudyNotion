const User= require("../models/User");
const OTP=require("../models/OTP");
const bcrypt=require("bcrypt")
const otpGenerator= require("otp-generator")
const Profile= require("../models/Profile");
const mailSender=require("../utils/mailSender");
const {passwordUpdated}=require("../mail/templates/passwordUpdate")
const {otpTemplate}= require("../mail/templates/emailVerificationTemplate")

const jwt= require("jsonwebtoken")
require("dotenv").config();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // 
exports.sendOTP=async(req,res,next)=>{

    try {
        
        //fetch email from reqest body
        const {email}= req.body;
    
        // check if user is already exist;
    console.log("send otp 1");
        const checkUserPresent= await User.findOne({email});
    console.log("send otp2");
        // if already exist the return a response
    
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }
        console.log("send otp 3");
    
        //generate  OTP
        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,

        });
        console.log("OTP generated:", otp);

        //check unique otp or not

        let result= await OTP.findOne({otp:otp});
        console.log("Result is Generate OTP Func")
        console.log("OTP", otp)
        console.log("Result", result);

        while(result){
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,

            })
        }
   

            const otpPayload={email, otp};

            //create an entry  for OTP
            const otpBody= await OTP.create(otpPayload);




            // const emailResponse = await mailSender(
            //     email,
            //     "OTP sent successfully",
            //     otpTemplate(
            //       otp
            //     )
            //   )

            console.log("OOTPBody",otpBody);

            // return response successfull

             res.status(200).json({
                success:true,
                message:'OTP Sent Successfully',
                otp,

            })





    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }





}


//signUp
exports.signUp=async(req,res,next)=>{

    try {
            // data fetch from request body
        const {firstName,lastName,email,password,confirmPassword,
            accountType,
            contactNumber,
            otp,
        }=req.body;
        console.log(req.body);

        //validate  data
        if(!firstName ||!lastName||!email ||!password ||!confirmPassword 
            ||!otp)
        {
            return res.status(403).json({
                success:false,
                message:"All Thing are required"
            })
        }
        //match both password
        if(password!=confirmPassword){
            return res.status(403).json({
                success:false,
                message:"Password Not Matched"
            })
        }
    
        //check user already exist or not
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(403).json({
                success:false,
                message:"User already Exist"
            })
            
        }

        //find most recent OTP store for the use
        const recentOtp= await OTP.find({email}).sort({createdAt:-1}).limit(1);

        console.log(recentOtp);

        // validate OTP
        if(recentOtp.length===0){
            //OTP not found

            return res.status(403).json({
                success:false,
                message:"Incorrect OTP"
            })
            
        }
        if(otp!==recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        // Hash password

        const hashedPassword= await bcrypt.hash(password,10);

        // create entry in DB
        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });
        let approved;
        approved==="Instructor"?(approved=false):(approved=true);

        const user= await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            approved,
            additionalDetails:profileDetails._id,
            image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        //return response;

        return res.status(200).json({
            success:true,
            message:"User is Registered Successfully",
            user,
        })
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registerd",

        })
        
    }
 
}


//Login

exports.login=async(req,res,next)=>{

    try {
        console.log("login");
        // get data from req body
        
    const {email, password}=req.body;
    console.log("email and password", email, password);
    //validation

    if(!email || !password){
        return res.status(403).json({
            success:false,
            message:"All Field are required"
        })
    }

    //check user exist or not

    const user= await User.findOne({email}).populate("additionalDetails");
    console.log("Printing user",user);
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not Registered ,Please signup first"
        })
    }
    //generate JWT after password matching

    if( await bcrypt.compare(password,user.password)){

        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }

        const token= jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        user.token=token;
        user.password=undefined;

        // create cookie and send response
        const options={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"Logged in Successfully",
        })
        // console.log("TOKEN");
        
    }
    else{
     
        return res.status(401).json({
            success:false,
            message:"Password is incorrect",
        })
    }


        
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Login failure, Please Try again",
        })
        
    }

    



};

//changePassword

exports.changePassword=async(req,res)=>{

    try {

        // // get data from req body
    const {oldPassword, newPassword}=req.body;
    
    // validation
    if(!newPassword ||!oldPassword){
        return res.status(500).json({
            success:false,
            message:"All field are mandotary",
        })
    }
    const userDetails= await User.findById(req.user.id);

    const isPasswordMatch= await bcrypt.compare(
        oldPassword,
        userDetails.password
    )
    
    if(!isPasswordMatch){
        return res.status(401).json(
          {  success:false,
            message:"The password is not matched"}
        )
    }

    // update Password in db in db

        
        const hashedPassword= await bcrypt.hash(newPassword,10);
        const user= await User.findByIdAndUpdate(
                           req.user.id,
                            {password:hashedPassword
    
                            },{new:true} );
    
        //send mail->password Updated
    
    // Send notification email
    try {
        const emailResponse = await mailSender(
          userDetails.email,
          "Password updated Successfully",
          passwordUpdated(
            userDetails.email,
            `Password updated successfully for ${user.firstName} ${user.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
        //return response
        return res.status(200).json({
            success:true,
            message:"Password changed sucessfully",
        })
 
     
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in changing password"
        })
    
        
    }
    

}