import React from 'react'
import Button from './Button'
import HighLightText from './HighLightText'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
// import {} from ""

const CodeBlocks = (    {position , heading, subheading, ctabtn1, ctabtn2, code ,backgroundGradient, codeColor}
) => {
  return (
    <div className={`flex  items-center ${position} my-20 justify-between lg:gap-10 flex-col`}>

    {/* Section 1 */}
    <div className='lg:w-[50%]  flex flex-col gap-8'>
        {/* Heading */}
        {heading}
        <div className=' text-richblack-300  font-bold'>
            {subheading}
        </div>
        <div className=' flex gap-7 mt-7'>
           <Button  active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className=' flex gap-2 items-center'>
                {ctabtn1.btnText}
                <FaArrowRight/>
            </div>
           </Button>

           <Button  active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
           </Button>

        </div>

        
    </div>
    
    {/* Section2 */}

        <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
            {/* hw-> bg gradient */}
        
                {backgroundGradient}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>


            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                <TypeAnimation 
                sequence={[code,2000,""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks