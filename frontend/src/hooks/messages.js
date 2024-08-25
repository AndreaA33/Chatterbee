import { useEffect, useState } from "react";
import { userChatContext } from '../context/context';

export const usemessages = () => {

    const [messages,setMessages] = useState([])
    const { Chat } = userChatContext();

    useEffect(() => {
        const handlemessages = async () => {

            try {
                console.log(Chat)
                
                const res = await fetch(`/api/messages/${Chat}`, {
                    method: "GET",
                })
    
                if (!res.ok) {
                    throw new Error("Failed to retrive messages");
                }
    
                const data = await res.json();
                setMessages(data)

                
            } catch (error) {
                console.error("Chatlist error:", error.message);
                console.log(error.message)
            }      
        }

        if (Chat) handlemessages()

    },[Chat])

    return {messages}
}

export default usemessages