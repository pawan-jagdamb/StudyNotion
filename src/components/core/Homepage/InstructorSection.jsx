import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighLightText from './HighLightText'
import Button from './Button'
import { FaArrowRight } from 'react-icons/fa'

export const InstructorSection = () => {
  return (
    <div className='flex flex-col lg:flex-row items-center justify-between gap-20'>
        <div className='lg:w-[50%] '>
            <img
                src={Instructor}
                alt='Instructor Image'
                className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit'
            />
        </div>
        <div className='lg:w-[50%] flex flex-col'>
            <div className='text-4xl font-semibold lg:w-[50%]'>
                Become an <HighLightText text={'Instructor'}/>
            </div>
            <p className='font-medium text-[16px] w-[90%] text-justify  text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='w-fit'> <Button active={true} linkto={'/signup'}>
                <div className='flex  gap-3 items-center'>
                    Start Learning Today
                    <FaArrowRight/>
                </div>
            </Button></div>
           

        </div>

    </div>
  )
}
