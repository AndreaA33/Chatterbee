import {React, useState} from 'react'
import "./chat.css"
import img1 from "../../assets/linkedin-pfp.jpg"
import pfp from "../../assets/johnpowell_headshot_0.jpg"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';

function Chat() {
    const [emoji,setemojiopen] = useState(false)
    const [text, setText] = useState("")
    
    const handleemoji = (e) =>{
        setText(prev=>prev+e.emoji)
        setemojiopen(false)
    }

    const [Image, setImage] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        console.log(e)

        reader.onload = () => {
            setText(prev=>prev+reader.result)
        }
        
        reader.readAsDataURL(file); 
    };


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
        <div className='chat-message'>
            <img src={img1}/>
            <div className='chat-text'>
                <p>Temporarily move some files from the memory stick to another storage device or your computer to free up space</p>
                <span>8:30am</span>
            </div>
        </div>
        <div className='chat-message own'>
            <div className='chat-text'>
                <p>If you need to copy a large file, consider compressing</p>
                <span>9:20am</span>
            </div>
            <img src={pfp}/>
        </div>
        <div className='chat-message'>
            <img src={img1}/>
            <div className='chat-text'>
                <p>If you have another memory stick or external hard drive with more </p>
                <span>9:30am</span>
            </div>
        </div>
        <div className='chat-message own'>
            <div className='chat-text'>
                <p>The error message "there is insufficient disk space to complete the operation" indicates that there is not enough free</p>
                <span>2:17pm</span>
            </div>
            <img src={pfp}/>
        </div>
        <div className='chat-message'>
            <img src={img1}/>
            <div className='chat-text'>
                <p>If you have another memory stick or external hard drive with more If you have another memory stick or external hard drive with more If you have another memory stick or external hard drive with more </p>
                <span>3:40am</span>
            </div>
        </div>
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
