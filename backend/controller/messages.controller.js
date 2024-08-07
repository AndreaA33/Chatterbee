import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";

export const sendmessage = async(req,res) => {
    try {
        const { message } = req.body
        const { receiverId } = req.params
        const senderId = req.user._id 

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId,receiverId]}
        })


        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId,receiverId]
            })
        }

        const newMessage = new Message({
            message,
            senderId,
            receiverId
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        res.status(201).json({message: "Message sent successfuly"})

    } catch (error) {
        console.error("Error sending message:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}