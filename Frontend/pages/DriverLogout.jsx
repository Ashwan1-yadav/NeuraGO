import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const UserLogout = () => {
  const token = localStorage.getItem('driver-token')
  const navigate = useNavigate()
  
  axios.get(`${import.meta.env.VITE_API_URL}/driver/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if(response.status === 200) {
      localStorage.removeItem('driver-token')
      navigate('/driver-login')
    }
  })
  
  return (
    <div>Driver logout successfully</div>
  )
}

export default UserLogout