import React from 'react'

export const HighLightText = ({text}) => {
  return (
    <span className='font-bold text-richblue-500 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text '>
    {" "}{text}</span>

  )
}
export default HighLightText
