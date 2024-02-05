import { useMutation } from '@apollo/client';
import React from 'react'
import { AiFillDelete } from "react-icons/ai";
import { DELETE_NOTE } from '../gql/Mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/Query'
import { useNavigate } from 'react-router-dom';
import links from '../constants/Routes'



const DeleteNote = ({noteId}) => {
    const navegate = useNavigate()
    const [deleteNote,{loading,error}] = useMutation(DELETE_NOTE,{
        variables:{
            deleteNoteId: noteId
        },
        refetchQueries:[
            {
              query:GET_MY_NOTES,
              variables: {meId: localStorage.getItem('Token')}
            },
            {
              query: GET_NOTES,
              variables: {cursor:""}
            }],
        onCompleted:()=>{
            navegate(links.MynotesLink)
        }
    })
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
  return (
    <div>
        <button onClick={deleteNote}> 
            <AiFillDelete className='text-2xl hover:text-red-500 text-black '/>
        </button>
    </div>
  )
}

export default DeleteNote