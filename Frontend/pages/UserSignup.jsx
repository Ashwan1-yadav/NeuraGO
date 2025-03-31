import { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { setUser } = useContext(UserDataContext);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagepreview, setProfileImagepreview] = useState(null);
  
  const navigate = useNavigate();

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
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("user-token", data.token);
      navigate("/dashboard");
    }

    setfirstName("");
    setlastName("");
    setemail("");
    setpassword("");
    setProfileImage(null);
  };

  return (
    <div className="bg-zinc-200 h-[100px] w-full oveflow-hidden">
       <div className="bg-zinc-200 h-screen rounded-t-xl shadow-2xl oveflow-hidden">
        <div className="p-7 bg-indigo-50 rounded-xl shadow-2xl h-full oveflow-hidden">
        <h1 className='text-zinc-800 flex items-center mt-[-15px] mb-5 text-xl font-bold '>Neura <span className='text-indigo-600'>G</span><span className='text-indigo-500'><img src="../GO.svg" alt="neura-logo" className='w-4 h-4' /></span></h1>
          <p className='font-bold text-2xl mb-4'>Set up your <span className='text-indigo-500'>account</span> </p>
          <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
            encType="multipart/form-data"
          >
            <div>
              <p className="text-zinc-800 text-md font-bold mb-4">Profile Image</p>
              {profileImagepreview ? <div className='flex items-center justify-center w-full'>
                <img src={profileImagepreview} className="h-18 w-18 border-1 shadow-md rounded-full object-cover" alt="profile-image" />
              </div> : <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="profileImage"
                  className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer bg-indigo-100 hover:bg-indigo-200"
                >
                  <div className="flex flex-col items-center justify-center pt-1 pb-2 ">
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
              What&apos;s your name?
            </p>
            <div className='flex gap-2'>
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
              className="bg-indigo-100 rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px]"
              type="text"
              placeholder="last name"
            />
            </div>
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
              What&apos;s will be your password?
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
              Create Account
            </button>
          </form>
          <p className=" mt-[15px] text-zinc-700 text-center text-sm">
            Already have an account ? &nbsp;
            <Link
              to="/user-login"
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

export default UserSignup