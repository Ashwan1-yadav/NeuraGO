/* eslint-disable react/prop-types */
import {useState,createContext} from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    email:"",
    firstName:"",
    lastName:"",
  })
  return (
    <div>
        <UserDataContext.Provider value={[user, setUser]}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext