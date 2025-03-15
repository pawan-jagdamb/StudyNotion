const User= require("../models/User");
const mailSender=require("../utils/mailSender");

const bcrypt=require("bcrypt");

//restPassword Token
exports.resetPasswordToken = async(req,res)=>{
    
    try {
            // get email from req body
        const email= req.body.email;
        console.log("first")
        // check user for this email, email validation
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Email required",
            })
        }

        const user= await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your Email is not regitered with us",
            });
        }
        //generate  token
        const token= crypto.randomUUID();
        console.log("second")
        // update user by adding token and expiration time

        const updatedDetails= await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires:Date.now() + 5*60*1000
                                        },{new:true})

        //create url
        const url=`http://localhost:5173/update-password/${token}`;
        console.log("third")


        //send mail containing the url
        console.log("Url of resetting password is ",url)

  
          const mailResponse=    await mailSender(email,
                        "Password Reset Link",
                        `Password Reset Link ${url}`
                    );
       console.log("Mail response",mailResponse)
       if(!mailResponse){
        return res.status(500).json({
            success:false,
            message:"Error in sending mail"
        })
       }
      

        //returen response
        console.log("four")

        return res.json({
            success:true,
            message:"Email sent successfully, please check email and change password"
        })
        
    } catch (error) {
        console.log("Error in Reset password");
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong reseting password"
        })
        
    }


}


//resetPassword

// actually reseting password
exports.resetPassword=async(req,res)=>{
   
    try {

            //data fetch
        const {password, confirmPassword,token}= req.body;
        //validation
        
        if(!password ||!confirmPassword  ){
            return res.status(401).json({
                success:false,
                message:"Password and confrim are all required for reseting password",
            })
        }
        if(password !=confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Password does not Match"
            })
        }
        // get userDetails from db using token

        const userDetails = await User.findOne({token:token});
         // if no entry -invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid cannot get user detail from reset password"
            })
        }
              // token time check if expire;
        if(userDetails.resetPasswordExpires<Date.now()){

            return res.json({
                success:false,
                message:"Link Expired"
            })

        }
        // hash password
       const hashedPassword= await bcrypt.hash(password, 10);

  
        // update password;
        await User.findOneAndUpdate(
                    {token:token},
                    {password:hashedPassword},
                    {new:true},
                );

         return res.status(200).json({
            success:true,
            message:"Password Reset Successfull"
         })       

        
    } catch (error) {
        console.log("Error in reseting password");
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in reseting password",
        });
    }


}

