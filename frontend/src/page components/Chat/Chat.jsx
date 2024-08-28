import {React, useState, useEffect} from 'react'
import "./chat.css"
import img1 from "../../assets/linkedin-pfp.jpg"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import usemessages from '../../hooks/messages';
import { useAuthContext, userChatContext } from '../../context/context';
import usesendmessage from '../../hooks/sendmessage';

function Chat() {
    
    const [emoji,setemojiopen] = useState(false)
    const [text, setText] = useState("")  
    const [Image, setImage] = useState("");
    const { Chat } = userChatContext();

    const {Authuser} = useAuthContext()
    
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

    const {messages, handlemessages} = usemessages()
    const {handleSend} = usesendmessage()

    useEffect(() => {
        handlemessages(); 
    }, [Chat]);

    const messageArray = Array.isArray(messages?.messages) ? messages.messages : [];


    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (text.trim()) {
            await handleSend(text)
            setText("")
            handlemessages()
        }
    };

    const convertedTime = (time) => {
        const date = new Date(time)
        const hours = date.getHours().toString().padStart(2, "0")
        const min = date.getMinutes().toString().padStart(2, "0")
        return `${hours}:${min}`
    }

  return (
    <div className='chat'>
      <div className='chat-banner'>
        <img src={Chat.profilepic}/>
        <div className='chat-inf'>
            <p>{Chat.fname} {Chat.lname}</p>
        </div>
      </div>
      <div className='chat-main'>
        {messageArray.map((value, index) => (
            <div key={index} className={value.senderId == Authuser._id? 'chat-message own': 'chat-message'}>
                <img className={"chat-message-img"} src={value.senderId == Authuser._id? Authuser.profilepic : Chat.profilepic}/>
                <div className='chat-text'>
                    <p>{value.messagecontent}</p>
                    <span>{convertedTime(value.createdAt)}</span>
                </div>
            </div>
        ))}
        </div>
        <form className='chat-textfield' onSubmit={handleSendMessage}>
            <div className='chat-emojicontainer'>
                <EmojiPicker open={emoji} onEmojiClick={handleemoji}/>
            </div>
            <IoIosLink className="chat-link" style={{color:"#FFFFFF", fontSize: 25}} onClick={() => {const updateinput = document.getElementById('upload').click()}} />
            <input type="file" id="upload" accept="image/file/*" style={{ display: 'none' }} onChange={handleImageChange}/>
            <input className="chat-textbox" placeholder='Type a message' onChange={e=>setText(e.target.value)} value={text}/>
            <MdOutlineEmojiEmotions className='chat-emoji' style={{color:"#FFFFFF", fontSize: 25}} onClick={()=>{setemojiopen(prev=>!prev)}}/>
            <div className='chat-sendbutton'>
                <input type={"submit"} value={"send"}/>
                <IoMdSend style={{fontSize: 25}}/>
            </div>
            
        </form>
    </div>
  )
}

export default Chat
