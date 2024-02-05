import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Home from './home'
import Favorites from './favorites'
import Mynotes from './mynotes'
import links from '../constants/Routes'
import Layout from '../Components/Layout'
import Note from './note'
import Signup from './signup'
import SignIn from './signIn'
import { gql, useQuery } from '@apollo/client'
import NewNote from './new'
import EditNote from './edit'

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`
const PrivateRoute = ()=>{
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error! {console.error(error)}</p>
  return(
    data.isLoggedIn ? <Outlet/> : <Navigate  to={links.signin}/>
  )
}

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route exact path={links.HomeLink} Component={Home}></Route>
            <Route path={links.FavoritesLink} element={<PrivateRoute />}>
              <Route path={links.FavoritesLink} element={<Favorites/>}></Route>
            </Route>
            <Route path={links.MynotesLink} element={<PrivateRoute />}>
              <Route path={links.MynotesLink}  element={<Mynotes/>}></Route>
            </Route>
            <Route path={links.newNoteLink} element={<PrivateRoute />}>
              <Route path={links.newNoteLink}  element={<NewNote/>}></Route>
            </Route>
            <Route path={links.editNote} element={<PrivateRoute />}>
              <Route path={links.editNote}  element={<EditNote/>}></Route>
            </Route>
            <Route path={links.NoteLink}  Component={Note}></Route>
            <Route path={links.signup}  Component={Signup}></Route>
            <Route path={links.signin}  Component={SignIn}></Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default Pages