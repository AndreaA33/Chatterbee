import { useEffect, useState, useCallback} from "react";
import { userChatContext } from '../context/context';

export const useconversations = () => {

    const [conversations,setConversations] = useState([])

    const { Chat } = userChatContext();

    const handleconversations = useCallback(async() => {
        try {
            const res = await fetch('/api/users', {
                method: "GET",
            })
    
            if (!res.ok) {
                throw new Error("Failed to retrive chatlist");
            }
    
            const convdata = await res.json();

            setConversations(convdata)
            
            
        } catch (error) {
            console.error("Chatlist error:", error.message);
            console.log(error.message)
        }   

    },[Chat])

    useEffect(() => {
        handleconversations(); 
    }, [handleconversations]);


    return {conversations,handleconversations}
}

