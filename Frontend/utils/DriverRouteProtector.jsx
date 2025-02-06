import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useContext} from 'react'
import {DriverDataContext} from '../context/DriverContext'
// eslint-disable-next-line react/prop-types
const DriverRouteProtector = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('driver-token')
    const [isLoading, setIsLoading] = useState(true)
    const {setDriver} = useContext(DriverDataContext)

    useEffect(() => {
        if(!token) {
            navigate('/driver-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/driver/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setDriver(response.data.driver)
                setIsLoading(false)
            }
        })
            .catch((e) => {
                console.log(e)
                localStorage.removeItem('driver-token')
                navigate('/driver-login')
            })
        setIsLoading(false)
    }, [token, navigate, setDriver])

    if(isLoading) {
        return <div>Loading...</div>
    }
    
    return <>{children}</>
}

export default DriverRouteProtector