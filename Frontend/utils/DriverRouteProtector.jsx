import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useContext} from 'react'
import {DriverDataContext} from '../context/DriverContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line react/prop-types
const DriverRouteProtector = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem('driver-token')
    const [isLoading, setIsLoading] = useState(true)
    const {setDriver} = useContext(DriverDataContext)

    useEffect(() => {
        if(!token) {
            toast.error('Access Denied. Please login to continue.');
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
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('driver-token')
                navigate('/driver-login')
            })
        setIsLoading(false)
    }, [token, navigate, setDriver])

    if(isLoading) {
        return <div>Loading...</div>
    }
    
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            {children}
        </>
    )
}

export default DriverRouteProtector