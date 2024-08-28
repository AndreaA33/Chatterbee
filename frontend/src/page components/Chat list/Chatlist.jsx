import React, { useState } from 'react'
import "./chatlist.css"
import { useAuthContext, userChatContext, useSearchContext } from '../../context/context';
import { toast } from 'react-hot-toast';
import { useconversations } from '../../hooks/conversations'
import {usesearch} from '../../hooks/search'

function Chatlist() {

    const {Authuser,setAuthuser} = useAuthContext()
    const { setChat } = userChatContext();
    const { Searchtxt, setSearchtxt } = useSearchContext()
   

    const handleLogout = async() => {
        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
            })

            if (!res.ok) {
                throw new Error("Failed to log out");
            }

            toast('Good bye!', {
                icon: '👏',
              });   

            
            setTimeout(() => {
                setAuthuser(null);
                localStorage.removeItem('chatuser');
            }, 2000);

            
        } catch (error) {
            toast.error("Logout failed")
            console.log(error.message)
        }       
    }
    
    const {conversations,handleconversations} = useconversations()

    const {search} = usesearch()

    const setList = (value) => {
      setSearchtxt("")
      setChat(value)
      handleconversations()
    }

    return (
    <div className='chatlist'>
      <div className='chatlist-user'>
        <img src={JSON.parse(localStorage.getItem("chatuser")).profilepic}/>
        <p>{Authuser.fname} {Authuser.lname}</p>
      </div>
      <div className='chatlist-search'>
        <input placeholder='Search' onChange={e=>setSearchtxt(e.target.value)} value={Searchtxt} />
      </div>
      <div className='chatlist-list'>
        {(Searchtxt ? search : conversations).map((value, index) => (
          <div key={index} className='chatlist-listitem' onClick={() => setList(value)}>
            <img src={value.profilepic}/>
              <div className='chatlist-listinf'>
                <div className='listinf-line1'>
                  <p>{value.fname} {value.lname}</p>
                  <p>9:47pm</p>
                </div>
                <div className='message'>
                  <p>message</p> 
                </div>
              </div>
          </div>
        ))}

      </div>
      <button className='logout-button' onClick={handleLogout}>LOGOUT</button>

    </div>
  )
}

export default Chatlist
