import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";


export const getusers = async(req,res) => {
    try {

        const userId = req.user._id 
    

        const filterparticipants = await Conversation.find({
            participants: userId
        })

        let participantIds = filterparticipants.flatMap(filterparticipants => filterparticipants.participants);

    
        participantIds = [...new Set(participantIds)].filter(id => id.toString() !== userId.toString());

        console.log(participantIds)

        for (const i of participantIds){
            const finduser = await User.find(i)
            partids = [...new Set(i)].filter(id => id.toString() !== userId.toString());
            console.log(partids)
        }
        res.status(200).json({})

    } catch (error) {
        console.error("Error retrieving users:", error.message);
        res.status(500).json({ error: "Server error" });
    }
}