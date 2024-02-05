import React, { useState } from 'react'

const NoteForm = ({label, content,action}) => {
  const [values,setValues] = useState(content || '')
  const handelChange = (e)=>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      action({
        variables:{
          ...values
      }})
    }} className='w-full flex flex-col items-center'>
        <textarea className='resize-none border-2 border-secend-color lg:w-[70%] sm:w-[90%] 
        max-sm:w-[100%] h-[300px] p-5 outline-none
        font-Garamond text-xl rounded-xl' placeholder={!content ?'Write You Note': content} 
        onChange={(e)=>{handelChange(e)}} name='content'></textarea>
        <button className='px-3 py-3 mt-14 mb-14 text-xl rounded-full font-Garamond border-2 
        border-secend-color lg:w-[15%] sm:w-[30%] max-sm:w-[50%]
        flex items-center justify-center hover:bg-secend-color text-black ' 
        type='submit'>{label}</button>
    </form>
  )
}

export default NoteForm