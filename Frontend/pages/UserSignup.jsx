import { Link } from 'react-router-dom'
import { useState } from 'react'

const UserSignup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userData, setuserData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setuserData({ 
      email: email, 
      password: password 
    });
    console.log(userData)
    setemail("");
    setpassword("");
  };

  return (
    <div className="bg-zinc-200 h-screen w-full">
      <div className="p-2 flex justify-center items-center bg-zinc-900 h-[80px] w-full rounded-b-xl shadow-lg">
      <img src="../public/login-icon.png" alt="car-icon" className="w-7 h-7 mr-2" />
        <p className="text-zinc-100 font-bold text-center  text-xl">
          Signup as User
        </p>
      </div>
      <div className="bg-zinc-200 h-screen mt-[10px] rounded-t-xl shadow-2xl">
        <div className="p-7 bg-zinc-100 rounded-xl shadow-2xl h-full">
          <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
          >
            <p className="text-zinc-800 text-md font-bold">
              Whats your email address?
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
              Whats your password?
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
              Create Account
            </button>
          </form>
          <p className=" mt-[15px] text-zinc-700 text-center text-sm">
            Already have an account ? &nbsp;
            <Link
              to="/user-login"
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

export default UserSignup