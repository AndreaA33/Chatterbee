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
    
    const [Chat, setChat] = useState("")

    return <ChatContext.Provider value={{Chat,setChat}}>{children}</ChatContext.Provider>
}

export const SearchContext = createContext();

export const useSearchContext = () => {
    return useContext(SearchContext)
}

export const SearchContextProvider = ({children}) => {
    
    const [Searchtxt, setSearchtxt] = useState("")

    return <SearchContext.Provider value={{Searchtxt,setSearchtxt}}>{children}</SearchContext.Provider>
}

export const MessagesContext = createContext();

export const useMessagesContext = () => {
    return useContext(MessagesContext)
}

export const MessagesContextProvider = ({children}) => {
    
    const [Messages, setMessages] = useState([])

    return <MessagesContext.Provider value={{Messages,setMessages}}>{children}</MessagesContext.Provider>
}