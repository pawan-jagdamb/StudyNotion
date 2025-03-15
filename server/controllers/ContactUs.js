const {contactUsEmail} =require("../mail/templates/contactFormRes");
const mailSender= require("../utils/mailSender")

exports.contactUsController= async(req,res)=>{
    const {email, firstname, lastname, message,phoneNo, countrycode}=req.body;
    console.log(req.body);
    try {
        const emailResponse= await mailSender(
            email, "Your Message Send Successfully",
            contactUsEmail(email, firstname,lastname,message,phoneNo, countrycode)
        )
        console.log("Email response from contact us controller",emailResponse);
        return res.json({
            success:true,
            message:"Email Send Successfully"
        })
        
        
        
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"Something went wrong"
        })
        
    }
}