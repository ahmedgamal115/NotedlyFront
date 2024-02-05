import React from 'react'
import Header from './Header'
const Layout = ({ children }) => {
  return (
    <div className="w-full h-full">
    <Header/>
    <div className='p-7 mt-5'>
        <main>{children}</main>
    </div>   
    </div>
  )
}

export default Layout