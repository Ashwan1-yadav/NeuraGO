/* eslint-disable no-unused-vars */
import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {DriverDataContext} from '../context/DriverContext'
import axios from "axios" 
import { FaRegUser } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';



const DriverLogin = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {setDriver} = useContext(DriverDataContext)

  const submithandler = async (e) => {
    e.preventDefault();
    const newDriver = { 
      email: email, 
      password: password 
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/driver/login`, newDriver);
      if(response.status === 200){
        const data = response.data
        setDriver(data.driver)
        localStorage.setItem("driver-token", data.token)
        toast.success('Login successful!');
        navigate("/driver-dashboard")
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }

    setemail("");
    setpassword("");
  };

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
      <div className="bg-zinc-200 h-[100px] w-full oveflow-hidden">
        <div className="bg-zinc-200 h-screen rounded-t-xl shadow-2xl oveflow-hidden">
            <div className="p-7 bg-indigo-50 rounded-xl shadow-2xl h-full">
            <h1 className='text-zinc-800 flex items-center mt-[-15px] mb-5 text-xl font-bold '>Neura <span className='text-indigo-600'>G</span><span className='text-indigo-500'><img src="../GO.svg" alt="neura-logo" className='w-4 h-4' /></span></h1>
            <p className='font-bold text-2xl mb-4'>Login as <span className='text-indigo-500'>driver</span> </p>
              <form
                onSubmit={submithandler}
                className="flex gap-4 flex-col justify-center"
              >
                <p className="text-zinc-800 text-md font-bold">
                  Enter your email
                </p>
                <input
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  name="email"
                  className="bg-indigo-100 rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
                  type="email"
                  placeholder="johnDoe@gmail.com"
                />
                <p className="text-zinc-800 text-md font-bold">
                  Enter your password
                </p>
                <input
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  name="password"
                  className="bg-indigo-100 rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
                  type="password"
                  placeholder="john@Doe"
                />
                <button
                  type="submit"
                  className="bg-[#535CE8] hover:bg-indigo-500 text-white font-bold py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg shadow-xl cursor-pointer"
                >
                  Login
                </button>
              </form>
              <p className=" mt-[15px] text-zinc-700 text-center text-sm">
                Join NeuraGO ? &nbsp;
                <Link
                  to="/driver-signup"
                  className="text-indigo-500 font-bold hover:text-indigo-600"
                >
                  Register as Driver
                </Link>
              </p>
              <Link
                to="/user-login"
                className="h-10 w-full bg-transparent border-1 rounded-md flex justify-center items-center text-indigo-500 font-bold hover:text-indigo-600 hover:bg-indigo-100 mt-[15px] shadow-xs cursor-pointer"
              ><FaRegUser className="text-xl text-indigo-600"/> &nbsp;
                Continue as User &rarr;
              </Link>
            </div>
          </div>
      </div>
    </>
                  
  );
}

export default DriverLogin