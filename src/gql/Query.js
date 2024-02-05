import { gql } from "@apollo/client"

const GET_NOTES = gql`
  query Query($cursor: String!) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          id
          username
          avater
        }
      }
    }
  }
`
const GET_NOTE = gql`
    query Query($noteId: ID!) {
        note(id: $noteId) {
        content
        favoriteCount
        createdAt
        author {
            id
            avater
            username
        }
        }
    }
`
const GET_MY_NOTES = gql`
  query Query($meId: ID!) {
    me(id: $meId) {
      id
      username
      avater
      Note {
        id
        content
        createdAt
        favoriteCount
      }
    }
  }
`
const GET_FAVORITE_NOTES = gql`
query Query($meId: ID!) {
  me(id: $meId) {
    id
    username
    avater
    favorites {
      id
      content
      createdAt
      favoriteCount
      author {
        id
        username
      }
    }
  }
}
`
const GET_ME = gql`
  query Query($meId: ID!) {
    me(id: $meId) {
      id
      favorites {
        id
      }
    }
  }
`
const IS_LOGGED_IN = gql` {
    isLoggedIn @client }
`;
export { GET_NOTE, GET_NOTES, IS_LOGGED_IN,
         GET_MY_NOTES, GET_FAVORITE_NOTES, GET_ME}