import React, { useState, useEffect, useRef } from 'react'
import "./chat.css"
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import usemessages from '../../hooks/messages';
import { useAuthContext, userChatContext } from '../../context/context';
import usesendmessage from '../../hooks/sendmessage';
import { useSocketContext } from '../../context/socketcontext';
import { useListerMessages } from '../../hooks/listenmessage';
import axios from 'axios';

function Chat() {
    const [emoji, setemojiopen] = useState(false)
    const [text, setText] = useState("")  
    const [Image, setImage] = useState("");
    const { Chat } = userChatContext();
    const {Messages, handlemessages} = usemessages()
    const {handleSend} = usesendmessage()
    useListerMessages()

    const {Authuser} = useAuthContext()
    const {online} = useSocketContext()
    const isonline = online.includes(Chat._id)
    
    const chatMainRef = useRef(null);

    const handleemoji = (e) =>{
        setText(prev => prev + e.emoji)
        setemojiopen(false)
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        
        if (file) {
          const formData = new FormData();
          formData.append('image', file);
      
          try {
            const response = await axios.post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
      
            setImage(response.data.imageUrl);
            
          } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image. Please try again.');
          }
        }
      };

    useEffect(() => {
        handlemessages(); 
    }, [Chat]);

    useEffect(() => {
        scrollToBottom();
    }, [Messages]);

    const scrollToBottom = () => {
        chatMainRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (text.trim() || Image) {
          if (Image) {
            await handleSend(JSON.stringify({ type: 'image', url: Image }));
          }
          if (text.trim()) {
            await handleSend(text);
          }
          setText("");
          setImage("");
          handlemessages();
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
                <img src={Chat.profilepic} alt="Profile"/>
                <div className='chat-inf'>
                    <p>{Chat.fname} {Chat.lname}</p>
                    <p>{isonline ? "Online" : "Offline"}</p>
                </div>
            </div>
            <div className='chat-main'>
                {Messages.map((value, index) => (
                    <div key={index} className={value.senderId === Authuser._id ? 'chat-message own' : 'chat-message'}>
                        <img className="chat-message-img" src={value.senderId === Authuser._id ? Authuser.profilepic : Chat.profilepic} alt="Chat"/>
                        <div className='chat-text'>
                            {typeof value.messagecontent === 'string' && value.messagecontent.startsWith('{"type":"image"') ? (
                                <img src={JSON.parse(value.messagecontent).url} alt="Sent image" className="sent-image" />
                            ) : (
                                <p>{value.messagecontent}</p>
                            )}
                            <span>{convertedTime(value.createdAt)}</span>
                        </div>
                    </div>
                ))}
                <div ref={chatMainRef} />
            </div>
            <form className='chat-textfield' onSubmit={handleSendMessage}>
                <div className='chat-emojicontainer'>
                    <EmojiPicker open={emoji} onEmojiClick={handleemoji}/>
                </div>
                <IoIosLink className="chat-link" style={{color:"#FFFFFF", fontSize: 25}} onClick={() => document.getElementById('upload').click()} />
                <input type="file" id="upload" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange}/>
                <div className='chatbox-container'>
                    <div className={Image ?'sendimg-container' : "no-visible"}>
                        <img src={Image} className={Image ? "send-image" : "no-visible"}></img>
                    </div>
                    <input className={Image ? "chat-textboxandimg": "chat-textbox"} placeholder='Type a message' onChange={e => setText(e.target.value)} value={text}/>
                </div>
                <MdOutlineEmojiEmotions className='chat-emoji' style={{color:"#FFFFFF", fontSize: 25}} onClick={() => setemojiopen(prev => !prev)}/>
                <div className='chat-sendbutton'>
                    <input type="submit" value="send"/>
                    <IoMdSend style={{fontSize: 25}}/>
                </div>
            </form>
        </div>
    )
}

export default Chat