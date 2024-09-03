import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../context/context";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState([]);
    const { Authuser } = useAuthContext();

    useEffect(() => {
        if (Authuser) {
            const newSocket = io("https://chatterbee.netlify.app/", {
                query: { userId: Authuser._id },
                withCredentials: true,
            });

            setSocket(newSocket);

            newSocket.on("getOnlineUsers",(users) => {
                setOnline(users)
            })

            return () => newSocket.disconnect();
        } else {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [Authuser]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    );
};
