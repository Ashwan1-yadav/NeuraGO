/* eslint-disable no-unused-vars */
import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {DriverDataContext} from '../context/DriverContext'
import axios from "axios" 

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

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/driver/login`, newDriver);
    if(response.status === 200){
      const data = response.data
      setDriver(data.driver)
      localStorage.setItem("driver-token",data.token)
      navigate("/driver-dashboard")
    }

    setemail("");
    setpassword("");
  };

  return (
    <div className="bg-zinc-200 h-screen w-full">
      <div className="p-2 flex justify-center items-center bg-zinc-900 h-[80px] w-full rounded-b-xl shadow-lg">
        <img src="../car-icon.png" alt="car-icon" className="w-14 h-14 mr-2" />
        <p className="text-zinc-100 font-bold text-center  text-xl">
          Login as Driver
        </p>
      </div>
      <div className="bg-zinc-200 h-screen mt-[10px] rounded-t-xl shadow-2xl">
        <div className="p-7 bg-zinc-100 rounded-xl shadow-2xl h-full">
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
              type="password"
              placeholder="john@Doe"
            />
            <button
              type="submit"
              className="bg-zinc-900 hover:bg-black text-white font-bold py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg shadow-xl"
            >
              Login
            </button>
          </form>
          <p className=" mt-[15px] text-zinc-700 text-center text-sm">
            Join NeuraGO ? &nbsp;
            <Link
              to="/driver-signup"
              className="text-emerald-600 font-bold hover:text-black"
            >
              Register as Driver
            </Link>
          </p>
          <Link
            to="/user-login"
            className=" mt-[150px] inline-block bg-orange-300 hover:bg-orange-700 text-black font-bold py-1 px-2 rounded-lg w-full text-[20px] text-center text-lg"
          >
            Continue as User &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DriverLogin