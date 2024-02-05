import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { MdOutlineFavorite } from 'react-icons/md'
import { GET_FAVORITE_NOTES, GET_NOTES } from '../gql/Query'
import { TOGGLE_FAVORITE } from '../gql/Mutation'
import '../Pages/loader.css'

const FavoriteNote = ({ favoriteCount, data, noteId }) => {
    const [count, setCount] = useState(favoriteCount)
    const [favorited,setFavorited] = useState(data.me.favorites.filter((note)=> note.id === noteId ).length > 0)
    const [toggoleFavorite,{loading,error}] = useMutation(TOGGLE_FAVORITE,{
        variables:{
            toggleFavoritId: noteId
        },
        refetchQueries:[
            {
                query:GET_FAVORITE_NOTES,
                variables:{
                    meId:localStorage.getItem('Token')
                }
            },
            {
                query:GET_NOTES,
                variables:{
                    cursor:""
                }
            },
    ]
    })
    if(loading) return <span style={{width:'48px', height:'48px'}} className="loader"></span>
    if(error) return <p>Error</p>
  return (
    <>
        {
            favorited ?
                <div className='py-1 lg:px-5 sm:px-4 max-sm:px-3 flex-1 flex justify-end items-center gap-4 border-2 border-secend-color'>
                    <MdOutlineFavorite onClick={()=>{
                        setCount(count - 1)
                        setFavorited(false)
                        toggoleFavorite()
                    }}  
                    className='text-xl text-red-600 cursor-pointer'/>
                    <p className='font-Garamond font-bold text-xl'>{count}</p>
                </div>
            :
                <div className='py-1 lg:px-5 flex-1 flex justify-end sm:px-4 max-sm:px-3 items-center gap-4 border-2 border-secend-color'>
                    <MdOutlineFavorite onClick={()=>{
                        setCount(count + 1)
                        setFavorited(true)
                        toggoleFavorite()
                    }} 
                    className='text-xl text-red-600 cursor-pointer'/>
                    <p className='font-Garamond font-bold text-xl'>{count}</p>
                </div>
        }
    </>
  )
}

export default FavoriteNote