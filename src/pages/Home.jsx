import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import HighLightText from '../components/core/Homepage/HighLightText'

import CTAButton from "../components/core/Homepage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Homepage/CodeBlocks'
import { TimeLineSection } from '../components/core/Homepage/TimeLineSection'
import { LearningLanguageSection } from '../components/core/Homepage/LearningLanguageSection'
import { InstructorSection } from '../components/core/Homepage/InstructorSection'
import Footer from '../components/common/Footer'
import { ExploreMore } from '../components/core/Homepage/ExploreMore'
import ReviewSlider from '../components/common/ReviewSlider'
const Home=()=>{
    return (
        <div className='w-screen min-h-screen bg-richblack-900  flex flex-col font-inter '>

        {/* Section1 */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
            <Link to={'/signup'}>
                <div className='group mt-16 p-1  mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit border-b' >
                    <div className=' flex gap-3 mx-auto items-center rounded-full px-10 py-[5px]
                     group-hover:bg-richblack-900  shadow-md'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-7'>
                Empower Your Future with 
                <HighLightText  text={"Coding Skills"}/>
               
            </div>
            <div className='w-[90%] text-center text-lg font-bold text-richblack-300
                        mt-4 '       >
                      With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <CTAButton active={true} linkto={'/signup'} > Learn More</CTAButton>

                <CTAButton active={false} linkto={'/login'}> Book a Demo</CTAButton>

            </div>
      

            <div className='mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-[70%] relative'>
                    <video
                       className="shadow-[20px_20px_rgba(255,255,255)]"
                    muted
                    loop
                    autoPlay
                    >
                        <source src={Banner} type='video/mp4'/>
                    </video>
            </div>

            {/* Code section 1 */}
            <div className=' '>
                <CodeBlocks 
                    position={"  lg:flex-row"}
                    heading={
                        <div className='text-4xl'> Unlock Your
                            <HighLightText text={"coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                    }
                    ctabtn1={
                        {btnText:"Try it yourself",
                        linkto:"/signup",
                        active:true,
                        }
                        
                    }
                    ctabtn2={
                        {btnText:"Learn More",
                        linkto:"/login",
                        active:false,
                        }
                        
                    }

                    code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                    codeColor={"text-yellow-25"}
                    
                />
            </div>
{/* Code section 2 */}
            <div>
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl'> Start
                            <HighLightText text={"Coding in second "}/>
                           
                        </div>
                    }
                    subheading={
"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson. "                   }
                    ctabtn1={
                        {btnText:"Continue Lesson",
                        linkto:"/login",
                        active:true,
                        }
                        
                    }
                    ctabtn2={
                        {btnText:"Learn More",
                        linkto:"/login",
                        active:false,
                        }
                        
                    }

                    code={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                    codeColor={"text-yellow-25"}
                    
                />
            </div>

           <ExploreMore/>

        </div>
        {/* Section2 */}

        <div className=' bg-pure-greys-5 text-richblack-700'>

        <div className='homepage-bg h-[333px]'>

            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto '>
                    <div className='h-[150px]'></div>
                <div className='flex flex-row gap-7 text-white   mt-9'>
                <CTAButton active={true} linkto={'/signup'}>
                    <div className='flex  items-center gap-3'>Explore Full Catelog
                    <FaArrowRight/></div>
                    
                </CTAButton>
                <CTAButton active={false} linkto={'/signup'}>
                <div>Learn More</div>
                    
                </CTAButton>

                </div>
            </div>
        </div>
          <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items center justify-between
          gap-7'>
            <div className='flex flex-col lg:flex-row gap-5 mb-10 mt-[90px]'>
                <div className='font-semibold lg:w-[45%] text-4xl'>
                Get the skills you need for a 
                <HighLightText text={"job that is in demand."}/> 
                </div>
                <div className='flex flex-col gap-10 lg:w-[40%] items-start '>
                    <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                    <div className=''>
                    <CTAButton active={true} linkto={'/login'}>Learn More</CTAButton>

                    </div>
                </div>
            </div>
            <TimeLineSection/>
          <LearningLanguageSection/>
          </div>

          
        </div>
        
        {/* Section3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8
        bg-richblack-900 text-white first-letter '>
            <InstructorSection></InstructorSection>
            <h2 className='text-4xl text-center font-semibold mt-10'>Review from other learners</h2>
            {/* Review Slider */}
            <ReviewSlider/>
        </div> 

        {/* footer */}
        <Footer/>



        </div>

    )
}

export default Home

