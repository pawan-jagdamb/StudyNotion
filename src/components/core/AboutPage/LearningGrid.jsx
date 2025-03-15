import React from 'react'
import HighLightText from '../Homepage/HighLightText';
import Button from '../Homepage/Button';

const LearningGridArray=[
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
          "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
      },
      {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
          "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
      },
      {
        order: 2,
        heading: "Our Learning Methods",
        description:
          "Studynotion partners with more than 275+ leading universities and companies to bring",
      },
      {
        order: 3,
        heading: "Certification",
        description:
          "Studynotion partners with more than 275+ leading universities and companies to bring",
      },
      {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
          "Studynotion partners with more than 275+ leading universities and companies to bring",
      },
      {
        order: 5,
        heading: "Ready to Work",
        description:
          "Studynotion partners with more than 275+ leading universities and companies to bring",
      },
];


export const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
    {
        LearningGridArray.map((card, index)=>{
            return(
                <div
                key={index}
                className={`
                p-5
                lg:h-[280px]  xl:h-[294px]
                ${index==0&& "lg:col-span-2 xl:col-span-2 xl:h-[294px]"} 
                ${card.order%2===0?"bg-richblack-700":"bg-richblack-800"}
                ${card.order===3 && "lg:col-start-2 xl:col-start-2"}
                ${card.order<0&&"bg-transparent"}

                `}
                >
                    {
                        card.order<0?
                        (
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3 xl:pb-0'> 
                                <div className='text-4xl font-semibold'>
                                    {card.heading}
                                    <HighLightText text={card.highlightText}/>
                                </div>
                                <p className='font-medium text-richblack-300'>
                                    {card.description}
                                </p>
                                <div className='text-richblack-300 w-[150px] font-medium'>
                                   <Button
                                active={true}
                                linkto={card.BtnLink}
                                >{card.BtnText}
                                    </Button>
                                </div>
                               
                                
                            </div>
                        )
                        :
                        (
                            <div className='flex lg:flex-col gap-8 p-8'>
                                <h1 className='text-richblack-5 text-lg'>
                                    {card.heading}
                                </h1>
                                <p className='text-richblack-200 font medium'>
                                    {card.description}
                                </p>
                            </div>
                        )
            
                    }

                </div>
            )
        })
    }
    </div>
  )
}
