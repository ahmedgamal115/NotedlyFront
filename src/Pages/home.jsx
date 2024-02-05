import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import NoteCard from '../Components/NoteCard'
import {GET_NOTES} from '../gql/Query';
import './loader.css'

function Home() {
  useEffect(()=>{
    document.title = "Home - Notedly"
  })
  const { loading, error, data, fetchMore } = useQuery(GET_NOTES,{
    variables:{cursor:''}
  });

  const handleLoadMore = ()=>{
    fetchMore({
      variables:{cursor:data.noteFeed.cursor},
      updateQuery:(previousResults,{fetchMoreResult})=>{
        if (!fetchMoreResult) return previousResults;
        return{
          noteFeed:{
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
            notes:[
              ...previousResults.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes
            ],
            __typename: "NoteFeed"
          }
        }
      }
    })
  }


  if(loading) return <div className='w-full h-screen flex justify-center items-center'><span className="loader"></span></div>
  if(error) return <p>Error</p>

  return (
    <div className="w-full flex flex-col flex-wrap gap-4 justify-center items-center">
      <div className="w-full flex flex-wrap gap-4 justify-center items-center">
        {
          data.noteFeed.notes.map((note)=>(
            <div key={note.id}>
              <NoteCard avater={note.author.avater} username={note.author.username} autherId={note.author.id}
              content={note.content} createdAt={note.createdAt} favoriteCount={note.favoriteCount}
              noteId={note.id} hideDetailsBtn={false}/>
            </div>
          ))
        }
      </div>
      {
        data.noteFeed.hasNextPage && 
          <button className='py-3 px-5 rounded-2xl font-Garamond text-2xl border-2 border-primary 
          flex items-center justify-center hover:bg-primary hover:text-white' 
          onClick={()=>{handleLoadMore()}}>Load More</button>
      }
    </div>
  )
}

export default Home