import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({children}) => {

    const [Authuser,setAuthuser] = useState(JSON.parse(localStorage.getItem("chatuser")) || null)

    return <AuthContext.Provider value={{Authuser,setAuthuser}}>{children}</AuthContext.Provider>
}


export const ChatContext = createContext();

export const userChatContext = () => {
    return useContext(ChatContext)
}

export const ChatContextProvider = ({children}) => {
    
    const [Chat, setChat] = useState(null)

    return <ChatContext.Provider value={{Chat,setChat}}>{children}</ChatContext.Provider>
}