import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg" 
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline= [
    {
        Logo:Logo1,
        Heading:"Leadership",
        Description:"Fully Committed to the success company"
    },
    {
        Logo:Logo2,
        Heading:"Responsibility",
        Description:"Students be always our top priority"
    },  
     {
        Logo:Logo3,
        Heading:"Flexibility",
        Description:"The ability to switch is an important skills"
    },   
    {
        Logo:Logo4,
        Heading:"Solve the problem",
        Description:"Code your way to solution"
    },
]
export const TimeLineSection = () => {
  return (
    <div className='flex flex-col md:flex-row gap-15 items-center'>
    {/* Left box */}
        <div className='flex flex-col md:w-[45%] gap-5'>
        {
            timeline.map((element, index)=>{
                return(
                    <div className='flex flex-col md:gap-3' key={index}>
                    <div className='flex  md:flex-row gap-6'>
                     
                        <div className=' w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full shadow-[#00000012] shadow-[0_0_62px_0]'>
                            <img src={element.Logo}></img>
                        </div>
                        <div>
                            <h2 className='font-semibold text-[18px]'> {element.Heading}</h2>
                            <p className='text-base'>{element.Description}</p>

                        </div>

                      
                       
                    </div>  
                    <div
                  className={`hidden ${
                    timeline.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
                 
                    </div>
                )
            })
        }
        

        </div>

        {/* Right box */}
        <div className='relative lg:mt-0 mt-10  shadow-blue-200 shadow-[0px_0px_30px_0px]'>

        <img src={timelineImage} alt='timelineImage'
          className="shadow-white  shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
        ></img>

        <div className='absolute bg-caribbeangreen-700 flex flex-col gap-14 md:gap-0 md:flex-row text-white
        uppercase py-6 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <div className='flex flex-row gap-5 items-center px-7 lg:px-14 border-r border-caribbeangreen-300'>
                <p className='text-3xl font-bold  w-[75px]'>10</p> 
                <p className='text-caribbeangreen-300 text-sm  w-[75px]'> Years of Experience</p>         
        </div>
        <div className=' flex  gap-5 items-center  px-7'>
                    <p className='text-3xl font-bold  w-[75px]'>250</p> 
                    <p className='text-caribbeangreen-300 text-sm  w-[75px]'>Types of courses</p>         
       

        </div>

        </div>

        </div>
    </div>
  )
}
