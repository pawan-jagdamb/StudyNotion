const express= require("express")

const app= express();

const  userRoutes= require("./routes/User");
const  profileRoutes= require("./routes/Profile");
const  paymentRoutes= require("./routes/Payments");
console.log("Here Riched");

const  courseRoutes= require("./routes/Course");
// console.log("Here");
const contactUsRoutes=require("./routes/Contact")

const database= require("./config/database");
const cookieParse= require("cookie-parser");

// const cors=require('cors');
const cors = require('cors');
const {cloudinaryConnect}= require("./config/cloudinary");
const fileUpload= require("express-fileupload");
const dotenv= require("dotenv");

const PORT = process.env.PORT||4000;
database.connect();
 
// console.log("serever riched") 
const allowedOrign=[
    'https://study-notion-frontend-ten-umber.vercel.app/',
    'http://localhost:5173','https://study-notion-sage-one.vercel.app/'
]
const corsOptions = {
    origin:(origin, callback)=>{
        if ( allowedOrign.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
        // console.log('oirigin',origin)
    },// Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],// Allowed methods
    credentials: true, // Allow cookies
};  
// origin:'https://study-notion-frontend-ten-umber.vercel.app/',// Allow only this origin
// 

app.use(cors(corsOptions));
// // middleware


app.use(express.json());    
app.use(cookieParse()); 

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)

// cludinary connection

cloudinaryConnect();
// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/reach",contactUsRoutes);

// default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is running"
    })
}) 

app.listen(PORT,()=>{
    console.log(`app is running ad port no ${PORT}`);
}) 



