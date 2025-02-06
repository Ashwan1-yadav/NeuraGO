import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import {DriverDataContext} from '../context/DriverContext'
import axios from 'axios'

const DriverSignup = () => {

  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNoPlate, setVehicleNoPlate] = useState("");

  const {setDriver} = useContext(DriverDataContext)

  const submithandler = async (e) => {
    e.preventDefault();

    const newDriver = {
      firstName: firstName, 
      lastName: lastName,
      email: email, 
      password: password,
      vehicleColor: vehicleColor,
      vehicleCapacity: vehicleCapacity,
      vehicleType: vehicleType,
      vehicleNoPlate : vehicleNoPlate
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/driver/register`, newDriver);
    
    if(response.status === 200){
      const data = response.data;
      setDriver(data.driver);
      localStorage.setItem("driver-token", data.token);
      navigate('/driver-dashboard')
    }
    
    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
    setVehicleColor("");
    setVehicleCapacity("");
    setVehicleType("");
    setVehicleNoPlate("");
  };

  return (
    <div className="bg-zinc-200 h-screen w-full">
      <div className="p-2 flex justify-center items-center bg-zinc-900 h-[80px] w-full rounded-b-xl shadow-lg">
      <img src="../car-icon.png" alt="car-icon" className="w-14 h-14 mr-2" />
        <p className="text-zinc-100 font-bold text-center  text-xl">
          Join NeuraGO
        </p>
      </div>
      <div className="bg-zinc-200 h-screen mt-[10px] rounded-t-xl shadow-2xl">
        <div className="p-5 bg-zinc-100 rounded-xl shadow-2xl h-full">
          <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
          >
            <p className="text-zinc-800 text-md font-bold">
              Name 
            </p>
            <div className='flex gap-2 mt-[-18px]'>
            <input
              value={firstName}
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
              name="firstName"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px]"
              type="text"
              placeholder="first name"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              name="lastName"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px] "
              type="text"
              placeholder="last name"
            />
            </div>
            <p className="text-zinc-800 text-md font-bold">
               Email 
            </p>
            <input
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              name="email"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px] mt-[-18px]"
              type="email"
              placeholder="johnDoe@gmail.com"
            />
            <p className="text-zinc-800 text-md font-bold">
              Password
            </p>
            <input
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              name="password"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px] mt-[-18px]"
              type="password"
              placeholder="john@Doe"
            />
            <p className="text-zinc-800 text-md font-bold">Vehicle Details</p>
            <div className='flex gap-3 mt-[-18px]'>
            <input
              value={vehicleNoPlate}
              onChange={(e) => {
                setVehicleNoPlate(e.target.value);
              }}
              name="vehicleNoPlate"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px] "
              type="text"
              placeholder="Vehicle No"
            />
            <input
              value={vehicleColor}
              onChange={(e) => {
              setVehicleColor(e.target.value);
              }}
              name="vehicleColor"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px]"
              type="text"
              placeholder="Vehicle Color"
            />
            </div>
            <div className='flex gap-2 mt-[-10px]'>
            <input
              value={vehicleCapacity}
              onChange={(e) => {
              setVehicleCapacity(e.target.value);
              }}
              name="vehicleCapacity"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px]"
              type="number"
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => {
              setVehicleType(e.target.value);
              }}
              name="vehicleType"
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none w-1/2 h-9 text-[15px] text-zinc-900"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">car</option>
              <option value="bike">bike</option>
              <option value="van">van</option>
            </select>
            </div>
            <button
              type="submit"
              className="bg-zinc-900 hover:bg-black text-white font-bold py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg shadow-xl"
            >
              Register as Driver
            </button>
          </form>
          <p className=" mt-[15px] text-zinc-700 text-center text-sm">
            Already registered ? &nbsp;
            <Link
              to="/driver-login"
              className="text-emerald-600 font-bold hover:text-black"
            >
              Login
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default DriverSignup