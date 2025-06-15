import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useContext} from 'react'
import {UserDataContext} from '../context/UserContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// eslint-disable-next-line react/prop-types
const DriverRouteProtector = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user-token')
    const [isLoading, setIsLoading] = useState(true)
    const {setUser} = useContext(UserDataContext)

    
    useEffect(() => {
        if(!token) {
            setIsLoading(false)
            navigate('/user-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                setIsLoading(false)
            }
        })
            .catch((e) => {
                localStorage.removeItem('user-token')
                toast.error(e.response.data.message)
                navigate('/user-login')
            })
        setIsLoading(false)
    }, [token, navigate, setUser])


    if(isLoading) {
        return <div>Loading...</div>
    }
    
    return <><ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />{children}</>
}

export default DriverRouteProtector