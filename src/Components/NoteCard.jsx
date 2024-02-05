import React from 'react'
import ReactMarkdown from 'react-markdown'
import { IS_LOGGED_IN } from '../gql/Query';
import { useQuery } from '@apollo/client';
import NoteUser from './NoteUser';


const NoteCard = ({ key, avater, username, content, createdAt, favoriteCount, autherId, noteId, hideDetailsBtn }) => {
    const day = new Date(createdAt).getDate()
    const month = new Date(createdAt).getMonth() + 1
    const year = new Date(createdAt).getFullYear()
    const {data} = useQuery(IS_LOGGED_IN)
  return (
    <div key={key} className='p-5 bg-primary lg:min-w-[450px] lg:min-h-[250px] flex flex-col justify-center rounded-lg
    sm:min-w-[600px] sm:min-h-[250px]  max-sm:min-w-[350px] max-sm:min-h-[250px]'>
        <div className='flex-1 flex flex-col justify-center items-center gap-3'>
            <ReactMarkdown className='font-bold font-Garamond text-3xl'>{ content }</ReactMarkdown>
            <p className='font-Garamond italic opacity-60 font-bold'>{day}/{month}/{year}</p>
        </div>
        <div className='flex-1 flex justify-evenly items-center'>
            <div className='flex-1 flex items-center justify-start gap-3'>
                <img 
                src={avater} 
                alt="user avatar"
                width={60}
                className='object-contain rounded-full' />
                <p className='font-montserrat italic'>{username}</p>
            </div>
            <div className='ml-5'>
            {
                data.isLoggedIn && 
                <NoteUser autherId={autherId} noteId={noteId} hideDetailsBtn={hideDetailsBtn} favoriteCount={favoriteCount} />
            }
            </div>
        </div>
    </div>
  )
}

export default NoteCard