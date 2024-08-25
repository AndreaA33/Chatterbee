import { useEffect, useState } from "react";

export const useconversations = () => {

    const [conversations,setConversations] = useState([])

    useEffect(() => {
        const handleconversations = async() => {
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
        }

        handleconversations()

    },[])

    return {conversations}
}

