/* eslint-disable react/prop-types */
import { createContext, useEffect} from "react";
import {io} from "socket.io-client"

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContextProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
        });

        socket.on("disconnect", () => {
            console.log("disconnected");
        });
    }, []);

    const sendMessage = (eventName,message) => {
        console.log(`sending message : ${message} to ${eventName}`)
        socket.emit(eventName,message);
    };

    const receiveMessage = (eventName,callback) => {
        socket.on(eventName,callback);
    };

    return (
        <SocketContext.Provider value={{sendMessage,receiveMessage}}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider