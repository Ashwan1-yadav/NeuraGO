/* eslint-disable react/prop-types */
import {useState,createContext} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const DriverDataContext = createContext()

const DriverContext = ({ children }) => {
  const [driver, setDriver] = useState("")
  return (
    <div>
        <DriverDataContext.Provider value={{driver, setDriver}}>
            {children}
        </DriverDataContext.Provider>
    </div>
  )
}

export default DriverContext