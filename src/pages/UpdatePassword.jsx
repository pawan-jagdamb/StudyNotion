import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { resetPassword } from '../services/operations/authAPI';
export const UpdatePassword = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const {loading}= useSelector((state)=>state.auth);
    const [showPassword, setShowPassword]= useState(false);
    const [showConfirmPassword, setShowConfirmPassword]=useState(false);
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })
    const {password,confirmPassword}= formData;
    const location= useLocation();
    const handleOnChange=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value
            }
        ))
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const token= location.pathname.split('/').at(-1); // it will take token from link which is available in rightmost part

        dispatch(resetPassword(password, confirmPassword,token,navigate));
    
    }
  return (
    <div 
    className=' grid min-h-[calc(100vh-3.5rem)] place-items-center '
    >
    {
        loading?
        (    <div className='flex justify-center items-center min-h-screen'>
                    <div className='spinner w-8 h-8 sm:w-10 sm:h-10'></div>
                </div>)
        :
        (
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className=' text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5 '>
                    Choose new Password
                </h1>
                <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                    Almost done. Enter your new password and you are all set.
                </p>
                <form onSubmit={handleOnSubmit}>
                    <label className='w-full relative'>
                        <p className='mt-4 mb-1 text-[.85rem] leading-[1.375rem] text-richblack-5'>New Password <sup className='text-pink-200'>*</sup> </p>
                        <div >
                               <input
                        className='form-style w-full'
                        required={true}
                        type={showPassword?"text":"password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange}
                        placeholder='New Password'
                        ></input>
                        <span
                       className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        onClick={()=> setShowConfirmPassword((prev)=>!prev)}
                
                        >
                                {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}                            </span>
                        </div>
                     
                    </label>
                    <label className='w-full relative '>
                        <p className=' mt-3  mb-1 text-[.85rem] leading-[1.375rem] text-richblack-5'>New Confirm Password <sup className='text-pink-200'>*</sup></p>
                        <input
                        className='form-style w-full'
                        required={true}
                        type={showConfirmPassword?"text":"password"}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder='Confirm Password'
                        >

                        </input>


                        <span
                       className="absolute right-3 top-[48px] z-[10] cursor-pointer"
                        onClick={()=> setShowPassword((prev)=>!prev)}
                
                        >
                                {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}                            </span>

                    </label>
                    <button type='submit'
                    className='mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                    >
                        Reset Password
                    </button>
                </form>
                <div className='mt-6 flex items-center justify-between'>
                    <Link to='/login'>
                        <p className='flex items-center gap-x-2 text-richblack-5'>
                        <BiArrowBack/>
                        Back to Login</p>
                    </Link>
                </div>
            </div>
        )
    }
    </div>
  )
}
