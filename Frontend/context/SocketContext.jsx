/* eslint-disable react/prop-types */
import { createContext, useEffect} from "react";
import {io} from "socket.io-client"

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContextProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketContextProvider