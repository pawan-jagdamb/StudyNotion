import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
// import { sendPaymentSuccessEmail, verifyPayment } from "../../../server/controllers/Payments";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints

 const RAZORPAY_KEY= import.meta.env.RAZORPAY_KEY;
function loadScript(src){
    return new Promise((resolve)=>{
        const script= document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true)
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}
export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId= toast.loading("Loading...");
    try {
        // Load the script
        const res= await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.dismiss(toastId)
            toast.error("RazorPay SDK  failed to load")
            return;
        }

        // initiate the order

        const orderResponse= await apiConnector("POST", COURSE_PAYMENT_API,
                                                {courses},
                                                {
                                                    Authorization:`Bearer ${token}`
                                                })
        if(!orderResponse){
            throw new Error(orderResponse.data.message);

        }
        console.log("Printing order response", orderResponse);
        const options={
            key:RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,

            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            descriptions:"Thank You for  purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler:function(response){
                // Send successfull email
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token,userDetails)


                // verify Payment
                verifyPayment({...response,courses}, token,navigate, dispatch )
            }
        }
        const paymentObject= new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed",function(response){
            toast.error("Payment failed");
            console.log("Payment object error");
        })

        toast.dismiss(toastId)
    } catch (error) {
        toast.dismiss(toastId)

        console.log("Payment api error", error);
        toast.error("could not make payment");

        
    }
}

async function sendPaymentSuccessEmail(response, amount, token,userDetails) {
    console.log("response is",response);
    console.log("camount is ",amount);
    console.log("token is", token);
    console.log("userDetails is ",userDetails);
    
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
            userDetails
        },{
            Authorization:`Bearer ${token}`
        })
        
    } catch (error) {
        console.log("Payment success email error", error );
        
    }
}


//  verify payment
async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId=toast.loading("Verifying Payment...");

    dispatch(setPaymentLoading(true));
    try {
        const response= await apiConnector("POST", COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successfull")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error...", error);
        toast.error("could no verify payment");
        
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))
}