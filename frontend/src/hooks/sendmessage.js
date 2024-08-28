import { userChatContext } from '../context/context';


const usesendmessage = () => {

    const { Chat } = userChatContext();

    const handleSend = async (text) => {
        try {
            const res = await fetch(`/api/messages/send/${Chat._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({message:text}) 
            })

            if (!res.ok) {
                throw new Error("Failed to send message");
            }

            
        } catch (error) {
            console.error("Message sending error:", error.message);
            console.log(error.message)
        }
    }

    return {handleSend}
}


export default usesendmessage
