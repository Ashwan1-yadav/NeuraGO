/* eslint-disable no-unused-vars */
import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'
import { GiSteeringWheel } from "react-icons/gi";

import axios from 'axios'

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submithandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("user-token", data.token);
      navigate("/dashboard");
    }
    setemail("");
    setpassword("");
  };

  return (
    <div className="bg-indig-200 h-[100px] w-full oveflow-hidden">
    <div className="bg-zinc-200 h-screen rounded-t-xl shadow-2xl oveflow-hidden">
        <div className="p-7 bg-indigo-50 rounded-xl shadow-2xl h-full">
        <h1 className='text-zinc-800 flex items-center mt-[-15px] mb-5 text-xl font-bold '>Neura <span className='text-indigo-600'>G</span><span className='text-indigo-500'><img src="../GO.svg" alt="neura-logo" className='w-4 h-4' /></span></h1>
        <p className='font-bold text-2xl mb-4'>Login your <span className='text-indigo-500'>account</span> </p>
          <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
          >
            <p className="text-zinc-800 text-md font-bold">
              What&apos;s your email address?
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
               What&apos;s your password?
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
            New to NeuraGO ? &nbsp;
            <Link
              to="/user-signup"
              className="text-indigo-500 font-bold hover:text-indigo-600"
            >
              Signup
            </Link>
          </p>
          <Link
            to="/driver-login"
            className="h-10 w-full bg-transparent border-1 rounded-md flex justify-center items-center text-indigo-500 font-bold hover:text-indigo-600 hover:bg-indigo-100 mt-[15px] shadow-xs cursor-pointer"
          ><GiSteeringWheel className="text-3xl text-indigo-600"/> &nbsp;
            Continue as Driver &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
