import { useEffect, useCallback } from "react";
import { userChatContext, useMessagesContext } from '../context/context';

export const usemessages = () => {

    const {Messages, setMessages} = useMessagesContext()
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
                
                const msg = Array.isArray(data?.messages) ? data.messages : [];
                setMessages(msg)

            } catch (error) {
                console.error("Chatlist error:", error.message);
                console.log(error.message)
            }      
        },[Chat])

        useEffect(() => {
            handlemessages(); 
        }, [handlemessages]);


    return {Messages, handlemessages}
}

export default usemessages