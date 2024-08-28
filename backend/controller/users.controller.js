import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";


export const getusersinconv = async(req,res) => {
    try {

        const userId = req.user._id 
    

        const filterparticipants = await Conversation.find({
            participants: userId
        })
        

        let participantIds = filterparticipants.flatMap(filterparticipants => filterparticipants.participants);

    
        participantIds = [...new Set(participantIds)].filter(id => id.toString() !== userId.toString());


        const usersInConversations = [];

        for (const i of participantIds) {
            const finduser = await User.findById(i); 
            if (finduser) {
                usersInConversations.push(finduser);
            }
        }


        res.status(200).json(usersInConversations);

    } catch (error) {
        console.error("Error retrieving users in conversation with:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}

export const getuser = async(req,res) =>{
    try {

        const { username } = req.body

        const finduserinfo = await User.find({username : { $regex: username, $options: 'i' }}).select("-password");

        res.status(200).json(finduserinfo)  
        
    } catch (error) {
        console.error("Error retrieving user:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}
