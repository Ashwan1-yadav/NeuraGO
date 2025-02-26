import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useContext} from 'react'
import {UserDataContext} from '../context/UserContext'
// eslint-disable-next-line react/prop-types
const DriverRouteProtector = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('user-token')
    const [isLoading, setIsLoading] = useState(true)
    const {setUser} = useContext(UserDataContext)

    useEffect(() => {
        if(!token) {
            navigate('/user-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
                setIsLoading(false)
            }
        })
            .catch((e) => {
                console.log(e)
                localStorage.removeItem('user-token')
                navigate('/user-login')
            })
        setIsLoading(false)
    }, [token, navigate, setUser])

    if(isLoading) {
        return <div>Loading...</div>
    }
    
    return <>{children}</>
}

export default DriverRouteProtector