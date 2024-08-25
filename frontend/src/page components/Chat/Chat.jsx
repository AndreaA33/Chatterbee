import {React, useState} from 'react'
import "./chat.css"
import img1 from "../../assets/linkedin-pfp.jpg"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import usemessages from '../../hooks/messages';

function Chat() {
    const [emoji,setemojiopen] = useState(false)
    const [text, setText] = useState("")  
    const [Image, setImage] = useState("");
    
    const handleemoji = (e) =>{
        setText(prev=>prev+e.emoji)
        setemojiopen(false)
    }

  

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        console.log(e)

        reader.onload = () => {
            setText(prev=>prev+reader.result)
        }
        
        reader.readAsDataURL(file); 
    };

    const {messages} = usemessages()
    const messageArray = Array.isArray(messages?.messages) ? messages.messages : [];

  return (
    <div className='chat'>
      <div className='chat-banner'>
        <img src={img1}/>
        <div className='chat-inf'>
            <p>Andrea Anikwe</p>
            <p>Online</p>
        </div>
      </div>
      <div className='chat-main'>
        {messageArray.map((value, index) => (
            <div key={index} className='chat-message'>
                <img src={img1}/>
                <div className='chat-text'>
                    <p>{value.messagecontent}</p>
                    <span>{value.createdAt}</span>
                </div>
            </div>
        ))}
      </div>
      <div className='chat-textfield'>
        <div className='chat-emojicontainer'>
            <EmojiPicker open={emoji} onEmojiClick={handleemoji}/>
        </div>
        <IoIosLink className="chat-link" style={{color:"#FFFFFF", fontSize: 25}} onClick={() => {const updateinput = document.getElementById('upload').click()}} />
        <input type="file" id="upload" accept="image/file/*" style={{ display: 'none' }} onChange={handleImageChange}/>
        <input className="chat-textbox" placeholder='Type a message' onChange={e=>setText(e.target.value)} value={text}/>
        <MdOutlineEmojiEmotions className='chat-emoji' style={{color:"#FFFFFF", fontSize: 25}} onClick={()=>{setemojiopen(prev=>!prev)}}/>
        <button className='chat-sendbutton'>Send<IoMdSend style={{fontSize: 25}}/></button>
    </div>
    </div>
  )
}

export default Chat
