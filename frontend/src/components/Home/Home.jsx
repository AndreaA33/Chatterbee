import React from 'react'
import "./home.css"
import Chatlist from "../../page components/Chat list/Chatlist"
import Chat from "../../page components/Chat/Chat"

function Home() {
  return (
    <div className='home'>
        <div className='home-container'>
          <Chatlist/>
          <Chat/>
        </div>
    </div>
  )
}

export default Home
