/* eslint-disable react/prop-types */
import {useState,createContext} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const RideDataContext = createContext()

const RideContext = ({ children }) => {
  const [RideContext, setRideContext] = useState("")
  return (
    <div>
        <RideDataContext.Provider value={{RideContext, setRideContext}}>
            {children}
        </RideDataContext.Provider>
    </div>
  )
}

export default RideContext