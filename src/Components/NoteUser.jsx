import React from 'react'
import { Link } from 'react-router-dom'
import { GET_ME } from '../gql/Query'
import { useQuery } from '@apollo/client'
import DeleteNote from './DeleteNote'
import FavoriteNote from './FavoriteNote'


const NoteUser = ({autherId, noteId, hideDetailsBtn, favoriteCount}) => {
    const { data, loading, error } = useQuery(GET_ME,{
        variables:{
            meId: localStorage.getItem("Token")
        }
    })
    
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error! {console.error(error)}</p>

  return (
    <div className='flex lg:flex-row sm:flex-col max-sm:flex-col
    sm:justify-center sm:items-start
    max-sm:justify-center max-sm:items-start 
    lg:justify-center lg:items-center gap-2'>
        <div className="flex justify-center items-center gap-2">
            <FavoriteNote favoriteCount={favoriteCount} data={data} noteId={noteId}/>
            {
                !hideDetailsBtn &&
                    <Link key={noteId} to={`/note/${noteId}`}
                    className='py-1 lg:px-5 font-Garamond border-2 border-secend-color
                    flex items-center justify-center hover:bg-secend-color text-black 
                    sm:px-4 max-sm:px-3'
                    > Details </Link>
            }
        </div>
        {
            data.me.id === autherId &&
            <div className="flex justify-center items-center gap-2">
                <Link className='py-1 lg:px-5 font-Garamond border-2 border-secend-color
                flex items-center justify-center hover:bg-secend-color text-black
                sm:px-4 max-sm:px-3'
                to={`/edit/${noteId}`}>Edit</Link>
                <DeleteNote noteId={noteId}/>
            </div>
        }
    </div>
  )
}

export default NoteUser