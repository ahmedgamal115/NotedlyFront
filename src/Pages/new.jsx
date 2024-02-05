import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import NoteForm from '../Components/NoteForm'
import { useNavigate } from 'react-router-dom'
import {NEW_NOTE} from '../gql/Mutation';
import {GET_NOTES,GET_MY_NOTES} from '../gql/Query';

const NewNote = () => {
  const navigate = useNavigate()
    useEffect(()=>{
        document.title = "New Note - Notedly"
    })
    const [data, {loading,error}] = useMutation(NEW_NOTE,{
      refetchQueries:[
        {
          query:GET_MY_NOTES,
          variables: {meId: localStorage.getItem('Token')}
        },
        {
          query: GET_NOTES,
          variables: {cursor:""}
        }],
      onCompleted:(data)=>{
        navigate(`/note/${data.newNote.id}`)
      }
    })
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
  return (
    <div className='w-full flex justify-center items-center'>
        <NoteForm label={"Create"} action={data}/>
    </div>
  )
}

export default NewNote