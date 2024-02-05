import { gql } from "@apollo/client"

const SIGNIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
        signIn(email: $email, password: $password)
    }
`
const SIGNUP_USER = gql`
    mutation Mutation($fullname: String!, $username: String!, $email: String!, $password: String!) {
        signUp(fullname: $fullname, username: $username, email: $email, password: $password)
    }
`

const NEW_NOTE = gql`
mutation Mutation($content: String!) {
  newNote(content: $content) {
    id
    content
    createdAt
    favoriteCount
    author {
      id
      fullname
      username
      email
      avater
    }
  }
}
`
const UPDATE_NOTE = gql`
  mutation Mutation($updateNoteId: ID!, $content: String!) {
    updateNote(id: $updateNoteId, content: $content) {
      id
      content
      createdAt
      favoriteCount
      author {
        id
        username
        avater
      }
    }
  }
`
const DELETE_NOTE = gql`
  mutation Mutation($deleteNoteId: ID!) {
    deleteNote(id: $deleteNoteId)
  }
`
const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorit($toggleFavoritId: ID!) {
    toggleFavorit(id: $toggleFavoritId) {
      id
      content
      createdAt
    }
  }
`
export {NEW_NOTE, SIGNIN_USER, SIGNUP_USER, 
        UPDATE_NOTE, DELETE_NOTE,TOGGLE_FAVORITE}