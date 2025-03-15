const {instance}=require("../config/razorypay");
const Course= require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {paymentSuccessEmail}= require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
const crypto= require("crypto")
// capture payment and initiate razorpay order
exports.capturePayment= async(req,res)=>{
    const {courses}= req.body;
    const userId= req.user.id;

    if(courses.length ===0){
        return res.json({
            success:false,
            message:"Please Provide course Id"
        })
    }

    let totalAmount=0;
    for(const course_id of courses){
        let course;
        try{
            console.log("Print", course_id);
            course= await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Could not find the course"
                })
            }

            const uid= new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already Enrolled"
                })
            }
            totalAmount += course.price;

        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:`Error in capturing payments +${error}`
            })

        }
    }
    const currency="INR";

    const options={
        amount:totalAmount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse= await instance.orders.create(options)
        res.json({
            success:true,
            data:paymentResponse,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not intintiate order"
        })
        
    }

    

}

//  Verify payment

exports.verifyPayment= async(req,res)=>{

    const razorpay_order_id= req.body?.razorpay_order_id;
    const razorpay_payment_id=req.body?.razorpay_payment_id;
    const razorpay_signature=req.body?.razorpay_signature;
    const courses= req.body?.courses;
    const userId= req.user.id;
    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses ||! userId){
        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })
    }
    let body= razorpay_order_id + "|"+razorpay_payment_id;

    const expectedSignature=crypto
                        .createHmac("sha256",process.env.RAZORPAY_SECRET)
                        .update(body.toString())
                        .digest("hex");
    
        if(expectedSignature===razorpay_signature){

            // Enrolled student

            await enrollStudents(courses, userId, res)


            return res.status(200).json({
                success:true,
                message:"Payment Verified"
            })
        }

        return res.status(200).json({
            success:false,
            message:"Payment failed"
        })
}

const enrollStudents= async(courses,userId, res)=>{

    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide data for course of userId"
        })
    }

    for(const courseId of courses){
        // Find the course  and enrolled in it

        try {
            
            
        const enrolledCourse=await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled :userId}},
            {new:true}
        )

        if(!enrolledCourse){
            return res.status(500).json({
                success:false,
                message:"course not found"
            })
       }
       console.log("Updated course: ", enrolledCourse)

       const courseProgress = await CourseProgress.create({
         courseID: courseId,
         userId: userId,
         completedVideos: [],
       })
       
        // Find the student and add the course to their list of enrolled courses

        const enrolledStudent= await User.findByIdAndUpdate(userId,
            {$push:{
                courses:courseId,
                courseProgress:courseProgress._id,
            },},{new:true}
        )
        console.log("Enrolled student: ", enrolledStudent)
        const emailResponsee= await mailSender(enrolledStudent.email,
            `Successfully Enrolled into ${enrolledCourse.courseName}`,
            courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
        ) 
        console.log("Email sent successfully",emailResponsee);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, error: error.message })


            
        }
    }

}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount,userDetails } = req.body
    // console.log("req.user is",req.user);
  
    // const userId = req.user.id
    console.log("userDetails is in payment server is ", userDetails)
    // return;
  
    if (!orderId || !paymentId || !amount || !userDetails) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
    
      await mailSender(
        userDetails.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${userDetails.firstName} ${userDetails.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
// exports.capturePayment= async(req,res)=>{
//     // get course id and user id
//     const{course_id}=req.body;
//     const userId=req.user.body;

//     // validation
//     if(!course_id){
//         return res.status(400).json({
//             success:false,
//             message:"Please provide valid course Id",
//         })
//     }

//     // check valid course Id
//     // check valid Course Detasils
//     let course;
//     try {
//         course= await Course.findById({course_id});
//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"sCourse Not Found in payment controllers"
//             })

//         }
//         // check user already pay for the same course

//         const uid=new mongoose.Types.ObjectId(userId)// convert to object id
//         if(Course.studentEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student already enrolled",

//             });
//         }

//     } catch (error) { 
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:`Error in payment -> ${error.message}`
//         })
        
//     }
//     // create order 
//     const amount=course.price;
//     const currency="INR";
//     const options={
//         amount:amount*100, // mendatory data
//         currency,        // mendatory data
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseId:course_id,
//             userId,
//         }
//     };
//     // function call for payment
//     try {
//         // initiate peyment using rezorpay
//         const paymentResponse=await instance.orders.create(options);
//         console.log(paymentResponse);
//         // return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail:course.thumbnail,
//             orderId:paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,

//         })
        
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order;"
//         })
        
//     }

// }
// // verify signature of Razorpay and server
// exports.verifySignature= async(req,res)=>{
//     const webhookSecret="12345678";

//     const signature=req.headers["x-razorpay-signature"];
//     // signature comes in hashed form so we have to hash webhookSecret
    
//     const shasum=crypto.createHmac("sha256",webhookSecret); // it is hashing function (Hmac= hash based method authentication code)
//     // that will hash given webhookSecret using a given hashing algorighm ie "sha256" // output is also know as digest
//     shasum.update(JSON.stringify(req.body));
//     const digest=shasum.digest("hex");

//     if(signature==digest){
//         console.log("Payment is Authorized");
        
//         // Add user to course db && add course it user db

//         // fetch from notes which we have sent to  create a payment to razorpay
//          const {courseId, userId}=req.body.payload.payment.entity.notes;
         
//          try {
//             // enroll student
//             // find the course and enroll the student in it
//             const enrolledCourse= await Course.findOneAndUpdate({_id:courseId},
//                                                         {
//                                                             $push:{studentEnrolled:userId}
//                                                         },
//                                                         {new:true},
//                                                 );
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"coruse not found in enrolling course ->varify signature"
//                 })
//             }
//             console.log("enrolled course->varify signature->",enrolledCourse);
//             // find student and add course to list of enrolled course i.e course
//             const enrolledStudent= await User.findOneAndUpdate({_id:userId},
//                                                     {
//                                                         $push:{course:courseId}
//                                                     },
//                                                     {new:true}
//                                                 );
            
//             console.log("Enrolled user->varify signature ->",enrolledStudent);
            

//             // send confimation to user that he/she has buy the course
//             const emailResponse=await mailSender(
//                 enrolledStudent.email,
//                                                 "Congratulation , you are onboarded to course",
//                                                  "You have bought  new course");
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:false,
//                 message:"Signature verified  and course is added"
//             })
            
//          } catch (error) {
//             console.log(error);
//             console.log("Error is occured in verify signature");
//             return re.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//          }

        
//     }
//     else{
//         return res.status(400).json({
//             success:false,
//             message:"Signature is not matched Invalid requrest",
//         })
//     }


// }