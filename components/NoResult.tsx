import React from 'react'
import { BiCommentX } from 'react-icons/bi'
import { MdOutlineVideocamOff } from 'react-icons/md'

const NoResult = ({text}: {text: string}) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>

            <div className='text-8xl'>
              {text ==='No comments yet' ? <BiCommentX /> : <MdOutlineVideocamOff />}
            </div>
            <div className="text-2xl">{text}</div>

    </div>
  )
}

export default NoResult