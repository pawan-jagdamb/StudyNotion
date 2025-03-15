const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Profile= require("../models/Profile");
const User= require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");


exports.updateProfile=async(req,res)=>{
    try {
        // get data 
        const {gender="",dateOfBirth,about="",contactNumber}=req.body;

        // get userId
        const id= req.user.id;
        //validation
        if(!contactNumber ||!gender || !id){
            return res.status(400).json({
                success:false,
                message:"contact gender and  id are required for updating profile"
            })
        }
        // find profile
        const userDetail= await User.findById(id); // userr detail
        const profileId= userDetail.additionalDetails; // profile id
        const profileDetail= await Profile.findById(profileId); // profile details
        //update profile
        profileDetail.dateOfBirth=dateOfBirth;
        profileDetail.gender= gender;
        profileDetail.about=about;
        profileDetail.contactNumber=contactNumber;
       await profileDetail.save();
       const updatedUserDetails= await User.findById(id)
      .populate("additionalDetails")
      .exec()
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        })
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in updating profile",
            error:error.message,
        })
    }
  

}
// explore->How can we schedule this deletion operation
exports.deleteAccount=async(req,res)=>{
    try {
        // get id
        const id=req.user.id;
        // validation
        const userDetail= await User.findById(id);
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"User Detail is not found for deleting account"
            })
        }   // delete Profile
        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails}); // delete profile
        //TODO HW: un enroll user form all enrolled courses
        await User.findByIdAndDelete(id); // delete from user
     
        // delete id
        
        // return response
        return res.status(200).json({
            success:true,
            message:"user account deleted Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while deleteing profile in controllers> profile> deleteAccount "
        })
        
    }
}

exports.getAllUserDetails= async(req,res)=>{
    try {
        // get id
        const id= req.user.id;
        // validation 
        if(!id){
            return res.status(404).json({
                success:false,
                message:"id is required of gettin all user"
            })
        }
        const userDetails= await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success:true,
            message:"user details fetched successfully",
            data:userDetails
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in getting user details",
            error:error.message,
        })
    }
}
exports.updateDisplayPicture=async(req,res)=>{
    try {
        const displayPicture= req.files.displayPicture
        const userId= req.user.id;
        const image= await uploadImageToCloudinary(
            displayPicture,process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile= await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
        res.send({
            success:true,
            message:`Image updated successfully`,
            data:updatedProfile,
        })
        
    } catch (error) {
        return res.status(500).json({
              success: false,
              message: error.message,
            })
    }
}
exports.getEnrolledCourses=async(req,res)=>{
    console.log("here riched");
    try {
        const userId= req.user.id;
        console.log("Reached inm get enroleed corse controller ", userId);
        let userDetails= await User.findOne({
            _id:userId,
        })
        .populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSection"
                },
            },
        })
        .exec();
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
          let totalDurationInSeconds = 0
          SubsectionLength = 0
          for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[
              j
            ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(
              totalDurationInSeconds
            )
            SubsectionLength +=
              userDetails.courses[i].courseContent[j].subSection.length
          }
          let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userId: userId,
          })
          courseProgressCount = courseProgressCount?.completedVideos.length
          if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
          } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
              Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
              ) / multiplier
          }
        }
    
        if (!userDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find user with id: ${userDetails}`,
          })
        }
        return res.status(200).json({
          success: true,
          data: userDetails.courses,
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

exports.instructorDashboard= async(req,res)=>{
    try {

        const courseDetails= await Course.find({instructor:req.user.id});

        const courseData= courseDetails.map((course)=>{
            const totalStudentsEnrolled=course.studentsEnrolled.length;
            const totalAmountGenerated= totalStudentsEnrolled*course.price;

            // Create a new object with these addition fields 
            console.log(totalAmountGenerated)

            const courseDataWithStats={
                _id:course._id,
                courseName:course.courseName,
                courseDesc: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats;
        })

        return res.status(200).json({
            courses:courseData
        })

        
    } catch (error) {
        console.log("Error",error);
        res.status(500).json({
            message:"Internal server error in instructor dashboard"
        })
        
    }
}