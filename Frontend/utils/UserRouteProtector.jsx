import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

// eslint-disable-next-line react/prop-types
const UserRouteProtector = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/user-login')
        }
        setIsLoading(false)
    }, [navigate])

    if(isLoading) {
        return <div>Loading...</div>
    }
    
    return <>{children}</>
}

export default UserRouteProtector