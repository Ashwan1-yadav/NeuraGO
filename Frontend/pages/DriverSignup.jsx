import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import {DriverDataContext} from '../context/DriverContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverSignup = () => {

  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagepreview, setProfileImagepreview] = useState(null);
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNoPlate, setVehicleNoPlate] = useState("");

  const {setDriver} = useContext(DriverDataContext)

  const handleProfileImageChange = async (e) => {
    setProfileImage(e.target.files[0]);
    setProfileImagepreview(URL.createObjectURL(e.target.files[0]));
  };

  const submithandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profileImage", profileImage);
    formData.append("vehicleColor", vehicleColor);
    formData.append("vehicleCapacity", vehicleCapacity);
    formData.append("vehicleType", vehicleType);
    formData.append("vehicleNoPlate", vehicleNoPlate);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/driver/register`, 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(response.status === 200) {
        const data = response.data;
        setDriver(data.driver);
        localStorage.setItem("driver-token", data.token);
        toast.success('Driver account created successfully!');
        navigate('/driver-dashboard');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
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
    <div className="bg-zinc-200 h-[100px] w-full oveflow-hidden">
      <div className="bg-zinc-200 h-screen rounded-t-xl shadow-2xl oveflow-hidden">
        <div className="p-5 bg-indigo-50 rounded-xl shadow-2xl h-screen">
        <h1 className='text-zinc-800 flex items-center mt-[-10px] mb-5 text-2xl font-bold '>Join Neura <span className='text-indigo-600'>G</span><span className='text-indigo-500'><img src="../GO.svg" alt="neura-logo" className='w-5 h-5' /></span></h1>
         <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
            encType="multipart/form-data"
          >
            <div>
              <p className="text-zinc-800 text-md font-bold mb-4">Profile Image</p>
              {profileImagepreview ? <div className='flex items-center justify-center w-full'>
                <img src={profileImagepreview} className="mt-[-15px] mb-[-20px] h-16 w-16 border-1 shadow-md rounded-full object-cover" alt="profile-image" />
              </div> : <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="profileImage"
                  className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer bg-indigo-100 hover:bg-indigo-200"
                >
                  <div className="flex flex-col items-center justify-center pt-1 pb-2">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 mb-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12M7 12V8M7 12H3M7 12h4m6 4v-4m0 0V8m0 4h4m-4 0h-4m-6 4v-4m0 0V8m0 4H3m4 0h4"
                      ></path>
                    </svg>
                    <p className="mb-0.5 text-xs text-gray-500">
                      <span className="font-semibold">Upload</span>
                    </p>
                  </div>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>}
               
            </div>
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px]"
              type="text"
              placeholder="first name"
            />
            <input
              value={lastName}
              onChange={(e) => {
                setlastName(e.target.value);
              }}
              name="lastName"
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px] "
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px] mt-[-18px]"
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px] mt-[-18px]"
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px] "
              type="text"
              placeholder="Vehicle No"
            />
            <input
              value={vehicleColor}
              onChange={(e) => {
              setVehicleColor(e.target.value);
              }}
              name="vehicleColor"
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px]"
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[15px]"
              type="number"
              placeholder="Vehicle Capacity"
            />
            <select
              value={vehicleType}
              onChange={(e) => {
              setVehicleType(e.target.value);
              }}
              name="vehicleType"
              className="bg-indigo-100 rounded px-4 py-1 outline-none w-1/2 h-9 text-[15px] text-zinc-500"
            >
              <option>Vehicle Type</option>
              <option value="car" className='text-zinc-900'>car</option>
              <option value="auto" className='text-zinc-900'>auto</option>
              <option value="bike" className='text-zinc-900'>motorcycle</option>
            </select>
            </div>
            <button
              type="submit"
              className="bg-[#535CE8] hover:bg-indigo-500 text-white font-bold py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg shadow-xl cursor-pointer"
            >
              Create Account
            </button>
          </form>
          <p className=" mt-[15px] text-zinc-700 text-center text-sm">
            Already a Driver ? &nbsp;
            <Link
              to="/driver-login"
              className="text-indigo-500 font-bold hover:text-indigo-600"
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