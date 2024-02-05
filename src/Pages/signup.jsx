import React, { useEffect, useState } from 'react'
import { useApolloClient,useMutation,gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom';
import UserForm from '../Components/UserForm';
import {SIGNUP_USER} from '../gql/Mutation';


const Signup = (props) => {
    const [handleError,setHandleError] = useState(null)
    const navigate = useNavigate()
    const client = useApolloClient()
    const [SignUp,{loading,error}] = useMutation(SIGNUP_USER,{
        onError:(err)=>{
            setHandleError(err.message)
        },
        onCompleted:data=>{
            localStorage.setItem("Token",data.signUp)
            client.writeQuery({query:gql` {
                isLoggedIn @client }
                `,data: { isLoggedIn: true }})
            navigate('/')
        }
    })
    useEffect(()=>{
        document.title = "SignUp - Notedly"
    },[])
  return (
    <div className='w-full flex justify-center items-center'>
        <UserForm formType={"SignUp"} action={SignUp} err={handleError}/>
    </div>
  )
}

export default Signup