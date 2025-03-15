import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiConnector';
import { contactusEndpoint } from '../../services/apis';
import countryCode from "../../data/countrycode.json"

export const ContactUsForm = () => {
    const [loading,setLoading]=useState(false);
    const{
        register, handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm();
    const submitContactForm= async(data)=>{
        console.log("logging data",data);

        try {
            setLoading(true);
            const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
            console.log("logging response", response);
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            console.log("error",error);
            

        }
    }
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[isSubmitSuccessful,reset]);


  return (
    <form onSubmit={handleSubmit(submitContactForm)}
    className='flex flex-col gap-7'>
        <div >
            <div className='flex flex-col lg:flex-row gap-2'> 
            {/* firstname */}
            <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label htmlFor='firstname' className='lable-style'>First Name </label>
                <input
                className='form-style'
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter First Name'
                    {...register("firstname",{required:true})}
                />
                {
                    errors.firstname&&(
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter your First name</span>
                    )
                }
            </div>
             {/* lastname */}
             <div className='flex flex-col gap-2 lg:w-[48%]'>
                <label htmlFor='lastname' className='lable-style'>Last Name </label>
                <input
                className='form-style'
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Enter Last Name'
                    {...register("lastname")}
                />
                {
                    errors.firstname&&(
                        <span className="-mt-1 text-[12px] text-yellow-100">Please Enter you Last name</span>
                    )
                }
            </div></div>
           
            {/* Email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='lable-style'>Email Address </label>
                <input
                className='form-style'
                    type='email'
                    name='email' 
                    id='email'
                    placeholder='Enter email Address'
                    {...register("email",{required:true})}
                />
                {
                    errors.email&&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your email address
                        </span>
                    )
                }
            </div>
            {/* Phone no */}
            <div className='flex flex-col gap-2 '>
                <label htmlFor='phonenumber' className='lable-style'>
                Phone Number</label>
                <div className='flex gap-5'>
                    {/* drop Down */}
                    <div className='flex w-[81px] flex-col gap-2'>
                    <select
                    className=' form-style'
                    name='dropdown'
                    id='dropdown'
                    {...register("countrycode",{required:true})}
                    >
                    {
                        countryCode.map((element,index)=>{
                            return(
                                <option key={index} value={element.code}> {element.code} -{element.country}</option>
                            )
                        })

                    }

                    </select>
                         
                    </div>
                    <div className='flex w-[calc(100%-90px)] flex-col'>
                        <input
                            type='tel'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='123456789'
                            className='form-style w-[calc(100%-90px)] '
                            {...register("phoneNo",
                                {required:{value:true, message:"Please Enter Phone Number"},
                                maxLength:{value:12,message:"Invalid Phone Number"},
                                minLength:{value:10, message:"Invalid Phone Number"}
                                })}
                        />
                    </div>
                </div>
                {
                    errors.phoneNo&&(
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>
            {/* message */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='message' className='lable-style'>Message</label>
                <textarea
                className='form-style'
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter your message here'
                    {...register("message",{required:true})}
                />
                {
                    errors.message&&(
                        <span className="-mt-1 text-[12px] text-yellow-100">Please enter your message</span>
                    )
                }
            </div>
        </div>
        <button 
        disabled={loading}
        type='submit' 
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}>            Send Message
        </button>

    </form>
  )
}
