import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApolloClient, useMutation, gql } from '@apollo/client'
import UserForm from '../Components/UserForm'
import {SIGNIN_USER} from '../gql/Mutation';

const SignIn = () => {
    const navigate = useNavigate()
    const client = useApolloClient()
    const [handleError,setHandleError] = useState(null)
    const [ SignIn , {loading,error} ] = useMutation(SIGNIN_USER,{
        onError:(err)=>{
            setHandleError(err.message)
        },
        onCompleted:(data)=>{
            localStorage.setItem("Token",data.signIn)
            client.writeQuery({
                query: gql`
                    {
                        isLoggedIn @client
                    }
                `,
                data:{ isLoggedIn: true }
            })
            navigate('/')
        }
    })
    useEffect(()=>{
        document.title = "SignIn - Notedly"
    },[])
    
  return (
    <div className='w-full flex justify-center items-center'>
        <UserForm formType={"SignIn"} action={SignIn} err={handleError}/>
    </div>
  )
}

export default SignIn