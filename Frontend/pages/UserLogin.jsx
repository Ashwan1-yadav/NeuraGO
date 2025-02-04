/* eslint-disable no-unused-vars */
import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState({});

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

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
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    }
    setemail("");
    setpassword("");
  };

  return (
    <div className="bg-zinc-200 h-screen w-full">
      <div className="p-2 flex justify-center items-center bg-zinc-900 h-[80px] w-full rounded-b-xl shadow-lg">
      <img src="../login-icon.png" alt="car-icon" className="w-7 h-7 mr-2" />
        <p className="text-zinc-100 font-bold text-center  text-xl">
          Login to Neurago
        </p>
      </div>
      <div className="bg-zinc-200 h-screen mt-[10px] rounded-t-xl shadow-2xl">
        <div className="p-7 bg-zinc-100 rounded-xl shadow-2xl h-full">
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
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
            New to NeuraGO ? &nbsp;
            <Link
              to="/user-signup"
              className="text-emerald-600 font-bold hover:text-black"
            >
              Signup
            </Link>
          </p>
          <Link
            to="/driver-login"
            className=" mt-[150px] inline-block bg-green-400 hover:bg-emerald-700 text-black font-bold py-1 px-2 rounded-lg w-full text-[20px] text-center text-lg"
          >
            Continue as Driver &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
