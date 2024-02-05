import React, { useState } from 'react'
import links from '../constants/Routes'
import { IoHome } from "react-icons/io5";
import { MdOutlineFavorite } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GrNotes } from "react-icons/gr";
import { Link, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from '../gql/Query';

const Header = () => {
    const { data, client } = useQuery(IS_LOGGED_IN)
    const navigate = useNavigate()
    const [barState,setBarState] = useState(false)
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='relative lg:w-[70%] sm:w-full max-sm:w-full bg-secend-color flex justify-between items-center py-3 px-10 rounded-b-[60px]'>
            <div className='w-[150px]'>
                <img 
                src="/images/logo.png" 
                alt="logo" 
                className='object-contain w-[150px]'
                />
            </div>
            <div className='flex-1 lg:flex items-center justify-end gap-5 sm:hidden max-sm:hidden'>
                <ul className='flex justify-center items-center gap-5 select-none'>
                    <li>
                        <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.HomeLink}>
                            <IoHome />
                            Home
                        </Link>
                    </li>
                    <li className='flex justify-center items-center gap-3'>
                        <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.FavoritesLink}>
                            <MdOutlineFavorite />
                            Favrites
                        </Link>
                    </li>
                    <li className='flex justify-center items-center gap-3'>
                        <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.MynotesLink}>
                            <GrNotes />
                            My Notes
                        </Link>
                    </li>
                    <li className='flex justify-center items-center gap-3'>
                        <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.newNoteLink}>
                            <IoIosAddCircleOutline />
                            New Note
                        </Link>
                    </li>
                </ul>
                {
                    data.isLoggedIn ?
                    <button type="button" className='px-3 py-2 rounded-full font-Garamond border-2 border-primary w-[15%]
                    flex items-center justify-center hover:bg-primary text-black '
                    onClick={()=>{
                        localStorage.removeItem("Token")
                        client.clearStore()
                        client.writeQuery({
                            query: gql`
                            {
                                isLoggedIn @client 
                            }
                            `,
                            data: { isLoggedIn: false }
                        })
                        
                        console.log(client.cache)
                        navigate('/')
                    }}>Log out</button>
                    :
                    <>
                        <Link to={links.signup} className='px-3 py-2 rounded-full font-Garamond border-2 border-primary w-[15%]
                    flex items-center justify-center hover:bg-primary text-black '>SignUp</Link>
                        <Link to={links.signin} className='px-3 py-2 rounded-full font-Garamond border-2 border-primary w-[15%]
                    flex items-center justify-center hover:bg-primary text-black'>SignIn</Link>
                    </>
                }
            </div>
            {
                !barState ?
                    <div className='sm:flex max-sm:flex flex-col justify-center 
                    items-end gap-1 lg:hidden cursor-pointer select-none'
                    onClick={()=>{
                        setBarState(!barState)
                    }}>
                        <span className='w-[30px] h-[5px] bg-black'></span>
                        <span className='w-[30px] h-[5px] bg-black'></span>
                        <span className='w-[30px] h-[5px] bg-black'></span>
                    </div> 
                :
                    <div className='relative sm:flex max-sm:flex flex-col justify-center 
                    items-end lg:hidden cursor-pointer select-none'
                    onClick={()=>{
                        setBarState(!barState)
                    }}>
                        <span className='absolute w-[30px] h-[5px] bg-black rotate-[45deg] origin-center transition-all'></span>
                        <span className='absolute w-[30px] h-[5px] bg-black rotate-[-45deg] origin-center transition-all'></span>
                    </div>
            }
            {
                barState &&
                    <div className={`absolute right-[10%] top-[100%] w-fit bg-secend-color ${barState ? 'p-2' : 'p-0'}
                    transition duration-300 ease-in-out overflow-hidden ${barState ? 'h-fit' : 'h-0'} z-50`}>
                        <ul className='flex flex-col justify-center items-center gap-5 select-none'>
                            <li className=' px-10 py-5 hover:bg-primary'>
                                <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.HomeLink}>
                                    <IoHome />
                                    Home
                                </Link>
                            </li>
                            <li className=' px-10 py-5 hover:bg-primary'>
                                <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.FavoritesLink}>
                                    <MdOutlineFavorite />
                                    Favrites
                                </Link>
                            </li>
                            <li className=' px-10 py-5 hover:bg-primary'>
                                <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.MynotesLink}>
                                    <GrNotes />
                                    My Notes
                                </Link>
                            </li>
                            <li className=' px-10 py-5 hover:bg-primary'>
                                <Link className='flex justify-center items-center gap-3 font-montserrat focus:outline-none' to={links.newNoteLink}>
                                    <IoIosAddCircleOutline />
                                    New Note
                                </Link>
                            </li>
                        </ul>
                        {
                            data.isLoggedIn ?
                            <button type="button" className='px-3 py-2 rounded-full font-Garamond border-2 border-primary w-full
                            flex items-center justify-center hover:bg-primary text-black '
                            onClick={()=>{
                                localStorage.removeItem("Token")
                                client.clearStore()
                                client.writeQuery({
                                    query: gql`
                                    {
                                        isLoggedIn @client 
                                    }
                                    `,
                                    data: { isLoggedIn: false }
                                })
                                navigate('/')
                            }}>Log out</button>
                            :
                            <>
                                <Link to={links.signup} className='px-3 py-2 mt-3 rounded-full font-Garamond border-2 border-primary w-full
                            flex items-center justify-center hover:bg-primary text-black '>SignUp</Link>
                                <Link to={links.signin} className='px-3 py-2 mt-3 rounded-full font-Garamond border-2 border-primary w-full
                            flex items-center justify-center hover:bg-primary text-black'>SignIn</Link>
                            </>
                        }
                    </div>
            }
        </div>
    </div>
  )
}

export default Header