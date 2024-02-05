import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_NOTES } from '../gql/Query'
import NoteCard from '../Components/NoteCard'
import './loader.css'
const Mynotes = () => {
  useEffect(()=>{
      document.title = "My Notes - Notedly"
  })
  const { loading, error, data } = useQuery(GET_MY_NOTES,{
    variables:{
      meId: localStorage.getItem('Token')
    }
  })
  if(loading) return <div className='w-full h-[70vh] flex justify-center items-center'><span className="loader"></span></div>
  if(error) return <p>Error! {console.error(error)}</p>
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-center">
      {
        data.me.Note.length !== 0 ?
          data.me.Note.map((note)=>(
            <div key={note.id}>
              <NoteCard avater={data.me.avater} username={data.me.username} 
              content={note.content} createdAt={note.createdAt} favoriteCount={note.favoriteCount}
              noteId={note.id} autherId={data.me.id} hideDetailsBtn={false}/>
            </div>
          ))
        :
          <h1>No notes yet</h1>
      }
    </div>
  )
}

export default Mynotes