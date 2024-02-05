import React, { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { MdDriveFileRenameOutline, MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const UserForm = ({ formType, action, err}) => {
    const [values,setValues] = useState()
    const handleChange = (e)=>{
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    
  return (
    <div className='lg:w-[40%] sm:w-[90%] max-sm:w-[100%] rounded-2xl bg-dark pt-7 px-5 pb-0 text-center'>
            <p className='text-white font-Garamond font-bold italic opacity-30 mb-4'>ahmed Gamal</p>
            <form onSubmit={(e)=>{
                e.preventDefault();
                try {
                    action({
                        variables:{
                            ...values
                        }
                    })
                } catch (error) {
                    
                }
            }}
            className='bg-dark2 rounded-2xl p-5'>
                <div className='w-full flex justify-center my-6'>
                    <img 
                    src="images/logo.png" 
                    alt="logo"
                    width={180}
                    className='object-contain' />
                </div>
                <div className='w-full flex justify-center items-center flex-col mb-5'>
                    { formType === "SignUp" ?
                    <h2 className='font-Garamond font-bold text-white text-2xl'> Welcome </h2>
                    :
                    <h2 className='font-Garamond font-bold text-white text-2xl'> Welcome to notedly </h2>
                    }
                    {formType === "SignUp" &&
                    <p className='font-Garamond text-gray-300 text-xl lg:w-[70%] sm:w-[70%] max-sm:w-[90%]'>
                        Please, Enter your information and make sure if you have account on gravatar website
                    </p>
                    }
                </div>
                { formType === "SignUp" && 
                    <div className='relative w-full h-fit overflow-hidden '>
                        <MdDriveFileRenameOutline className='absolute top-[25%] lg:left-[18%] sm:left-[9%] max-sm:left-[5%] text-gray-300 text-2xl'/>
                        <input 
                        type="text" 
                        name="fullname" 
                        placeholder='Fullname'
                        className='bg-transparent lg:w-[70%] sm:w-[90%] max-sm:w-[100%] py-2 px-14 text-gray-300 font-Garamond outline-none
                        text-xl rounded-lg border-[1px] border-red-100'
                        onChange={(e)=>{handleChange(e)}}/>
                    </div>
                }
                { formType === "SignUp" && 
                    <div className='relative w-full h-fit overflow-hidden '>
                        <FaRegUser className='absolute top-[25%] lg:left-[18%] sm:left-[9%] max-sm:left-[5%] text-gray-300 text-2xl'/>
                        <input 
                        type="text" 
                        name="username" 
                        placeholder='Username'
                        className='bg-transparent lg:w-[70%] sm:w-[90%] max-sm:w-[100%] py-2 px-14 text-gray-300 font-Garamond outline-none
                        text-xl rounded-lg border-[1px] border-red-100'
                        onChange={(e)=>{handleChange(e)}}/>
                    </div>
                }
                <div className='relative w-full h-fit overflow-hidden '>
                    <MdEmail className='absolute top-[25%] lg:left-[18%] sm:left-[9%] max-sm:left-[5%] text-gray-300 text-2xl'/>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder='Email'
                    className='bg-transparent lg:w-[70%] sm:w-[90%] max-sm:w-[100%] py-2 px-14 text-gray-300 font-Garamond outline-none
                    text-xl rounded-lg border-[1px] border-red-100'
                    onChange={(e)=>{handleChange(e)}}/>
                </div>
                <div className='relative w-full h-fit overflow-hidden '>
                    <RiLockPasswordFill className='absolute top-[25%] lg:left-[18%] sm:left-[9%] max-sm:left-[5%] text-gray-300 text-2xl'/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Password'
                    className='bg-transparent lg:w-[70%] sm:w-[90%] max-sm:w-[100%] py-2 px-14 text-gray-300 font-Garamond outline-none
                    text-xl rounded-lg border-[1px] border-red-100'
                    onChange={(e)=>{handleChange(e)}}/>
                </div>
                {
                    err &&
                    <p className='mt-3 text-xl text-red-300 font-Garamond '>{err}</p>
                }
                <div className='w-full flex justify-center'>
                    <button className='py-3 px-5 lg:mt-14 lg:mb-14 sm:mt-10 sm:mb-10 max-sm:mt-10 max-sm:mb-10 font-Garamond text-xl border-2 border-secend-color w-[70%]
                    flex items-center justify-center hover:bg-secend-color text-white hover:text-black' 
                    type='submit'>{ formType === "SignUp" ? 'Submit' : 'Signin'}</button>
                </div>
            </form>
        </div>
  )
}

export default UserForm