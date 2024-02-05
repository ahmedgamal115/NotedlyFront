import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_FAVORITE_NOTES } from '../gql/Query'
import NoteCard from '../Components/NoteCard'
import './loader.css'

const Favorites = () => {
  useEffect(()=>{
      document.title = "Favorites - Notedly"
  })
  const { loading, error, data } = useQuery(GET_FAVORITE_NOTES,{
    variables:{
      meId: localStorage.getItem('Token')
    }
  })
  if(loading) return <div className='w-full h-[70vh] flex justify-center items-center'><span className="loader"></span></div>
  if(error) return <p>Error! {console.error(error)}</p>
  return (
    <div className="w-full flex flex-wrap gap-4 justify-center items-center">
      {
        data.me.favorites.length !== 0 ?
          data.me.favorites.map((note)=>(
            <div key={note.id}>
              <NoteCard avater={data.me.avater} username={data.me.username} 
              content={note.content} createdAt={note.createdAt} favoriteCount={note.favoriteCount}
              noteId={note.id} autherId={note.author.id} hideDetailsBtn={false}/>
            </div>
          ))
        :
          <h1>No fevorite notes yet</h1>
      }
      
    </div>
  )
}

export default Favorites