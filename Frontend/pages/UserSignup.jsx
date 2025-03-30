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
    <div className="bg-zinc-200 h-screen w-full">
      <div className="p-2 flex justify-center items-center bg-zinc-900 h-[80px] w-full rounded-b-xl shadow-lg">
      <img src="../login-icon.png" alt="car-icon" className="w-7 h-7 mr-2" />
        <p className="text-zinc-100 font-bold text-center  text-xl">
          Signup as User
        </p>
      </div>
      <div className="bg-zinc-200 h-screen mt-[10px] rounded-t-xl shadow-2xl">
        <div className="p-7 bg-zinc-100 rounded-xl shadow-2xl h-full">
          <form
            onSubmit={submithandler}
            className="flex gap-4 flex-col justify-center"
            encType="multipart/form-data"
          >
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-1/2 h-9 text-sm placeholder:text-[16px]"
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
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
              className="bg-[#eeeeee] rounded px-4 py-1 outline-none  w-full h-9 text-sm placeholder:text-[16px]"
              type="password"
              placeholder="john@Doe"
            />
            <div>
              <p className="text-zinc-800 text-md font-bold mb-4">Profile Image</p>
              {profileImagepreview ? <img src={profileImagepreview} alt="profile-image" className="w-full h-full rounded-md"/> : <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="profileImage"
                  className="flex flex-col items-center justify-center w-full h-12 border-2 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
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