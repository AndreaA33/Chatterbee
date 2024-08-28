import { useEffect, useState, useCallback } from "react";
import { userChatContext } from '../context/context';

export const usemessages = () => {

    const [messages,setMessages] = useState([])
    const { Chat } = userChatContext();

        const handlemessages = useCallback(async () => {
            try {
                
                const res = await fetch(`/api/messages/${Chat._id}`, {
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
        },[Chat])

        useEffect(() => {
            handlemessages(); 
        }, [handlemessages]);


    return {messages, handlemessages}
}

export default usemessages