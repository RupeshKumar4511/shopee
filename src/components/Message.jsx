import React from 'react'

const Message = ({msg}) => {
  return (
    <div className='flex w-full justify-center h-96 font-bold text-3xl'>
      <h1 className='relative top-32'>{msg}</h1>
    </div>
  )
}

export default Message
