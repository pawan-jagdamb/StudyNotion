import React from 'react'
import HighLightText from "./HighLightText"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others  from "../../../assets//Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import Button from "../Homepage/Button"

export const LearningLanguageSection = () => {
  return (
    <div className='mt-[150px] mb-32'>
      <div className='flex flex-col gap-5 items-center'>

        <div className='text-3xl w-[100%] font-semibold text-center my-10'>
          Your Swiss Knife for<HighLightText text={"Learning any language"}/>
        </div>
        <div className='text-center text-richblack-600  mx-auto text-base font-semibold  w-[-100%] lg:w-[70%]'>
          With our comprehensive courses, you will learn to speak, write, and understand any language with easy.
          With 20+ languages realistic voice-over progress tracking, custom schedule and more.
        </div>
          <div className=' flex lg:flex-row flex-col  items-center justify-center mt-5'>
            <img
              src={know_your_progress}
              alt='KnowYourProgressImage'
              className='object-contain lg:-mr-32  '
            />
             <img
              src={compare_with_others}
              alt='compareWithOtherImage'
              className='object-contain lg:-mb-10 lg:-mt-0 -mt-16 '
            />
             <img
              src={plan_your_lesson}
              alt='PlanYourLessonImage'
              className='object-contain lg:-ml-36 lg:-mt-5 -mt-20'
            />
          </div>
          <div className='w-fit'>
            <Button active={true} linkto={'/signup'}>
              <div className=''>
                Learn More
              </div>
            </Button>
          </div>
       </div>
    </div>
  )
}
