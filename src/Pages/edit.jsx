import React from 'react'
import { useQuery, useMutation } from '@apollo/client' 
import { GET_ME, GET_NOTE } from '../gql/Query'
import { UPDATE_NOTE } from '../gql/Mutation'
import { useNavigate, useParams } from 'react-router-dom'
import NoteForm from '../Components/NoteForm'

const EditNote = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const { data : userData } = useQuery(GET_ME,{
        variables:{
            meId: localStorage.getItem('Token')
        }
    })
    const {data, loading, error} = useQuery(GET_NOTE,{
        variables:{
            noteId: id
        }
    })
    const [editNote] = useMutation(UPDATE_NOTE,{
        variables:{
            updateNoteId: id
        },
        refetchQueries:[{
            query:GET_NOTE,
            variables:{noteId: id}
        }],
        onCompleted:()=>{
            navigate(`/note/${id}`)
        }
    })


    if(loading) return <p>Loading...</p>
    if(error) return <p>Error! {console.error(error)}</p>
  return (
    data.note.author.id === userData.me.id ?
    <div>
        <NoteForm label={"Update"} content={data.note.content} action={editNote}/>
    </div>
    :
    <h1>You dont have authourized to update that Note</h1>
  )
}

export default EditNote
