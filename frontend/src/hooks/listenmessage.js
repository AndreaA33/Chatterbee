import { useSocketContext } from "../context/socketcontext"
import { useEffect, useState } from "react"
import { useMessagesContext } from '../context/context';

export const useListerMessages = () => {
    const {socket} = useSocketContext()
    const {Messages, setMessages} = useMessagesContext()

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            setMessages([...Messages, newMessage]); 
        }); 

        return () => {
            socket?.off("newMessage");
        };

    },[socket,Messages,setMessages,useMessagesContext])
}