import React, { useEffect } from 'react'
import "./chatlist.css"
import { useAuthContext, userChatContext } from '../../context/context';
import { toast } from 'react-hot-toast';
import { useconversations } from '../../hooks/conversations'

function Chatlist() {

    const {setAuthuser} = useAuthContext()
    const { Chat,setChat } = userChatContext();

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
    
    
    const {conversations} = useconversations()

    return (
    <div className='chatlist'>
      <div className='chatlist-user'>
        <img src={JSON.parse(localStorage.getItem("chatuser")).profilepic}/>
        <p>{JSON.parse(localStorage.getItem("chatuser")).fname} {JSON.parse(localStorage.getItem("chatuser")).lname}</p>
        <p>***</p>
      </div>
      <div className='chatlist-search'>
        <input placeholder='Search'/>
        <button>+</button>
      </div>
      <div className='chatlist-list'>
        {conversations.map((value, index) => (
          <div key={index} className='chatlist-listitem' onClick={setChat(value._id)}>
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
