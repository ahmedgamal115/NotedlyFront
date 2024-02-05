import React from 'react'
import { useParams } from 'react-router-dom'
import {useQuery} from '@apollo/client'
import NoteCard from '../Components/NoteCard'
import {GET_NOTE} from '../gql/Query';
import './loader.css'


const Note = (props) => {
    const {id} = useParams()
    const { loading, error, data } = useQuery(GET_NOTE,{
        variables:{noteId:id}
    })

  if(loading) return <div className='w-full h-[70vh] flex justify-center items-center'><span className="loader"></span></div>
  if(error) return <p>Error! {console.error(error)}</p>

  return (
    <div className='w-full flex items-center justify-center'>
        <div className='lg:w-[60%] sm:w-full max-sm:w-[80%]'>
            <NoteCard key={data.note.id} avater={data.note.author.avater} content={data.note.content} 
            createdAt={data.note.createdAt} favoriteCount={data.note.favoriteCount} username={data.note.author.username}
            noteId={id} autherId={data.note.author.id} hideDetailsBtn={true}/>
        </div>
    </div>
  )
}

export default Note