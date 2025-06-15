/* eslint-disable react/prop-types */
import { GiPathDistance } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import axios from "axios";

const NewRideConfirmation = ({
  NewRideConfirmationPanel,
  setNewRideConfirmationPanel,
  setnewRideAvailablePanel,
  ride,
}) => {
  const NewRideConfirmationPanelRef = useRef(null);

  useGSAP(
    () => {
      if (NewRideConfirmationPanel) {
        gsap.to(NewRideConfirmationPanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(NewRideConfirmationPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [NewRideConfirmationPanel] }
  );

  const confirmRide = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/rideOngoing`,{
      params : {
        rideId: ride?._id,
        driverId: ride?.driver,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("driver-token")}`,
      },
    })
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div
        ref={NewRideConfirmationPanelRef}
        className="fixed w-full h-screen rounded-t-lg shadow-t-lg bg-white  bottom-0 px-3 py-3"
        style={{ transform: "translateY(0%)" }}
      >
        <h1 className="text-xl font-bold">Confirm your <span className="text-indigo-600">Ride</span></h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setNewRideConfirmationPanel(false);
            }}
            className="text-xl bg-indigo-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-4  right-2"
          />
        </p>
        <hr className="border-zinc-300 mt-2 mb-2" />
        <div className="flex justify-between items-center h-18 bg-indigo-200  shadow-md p-2 rounded-lg">
          <div className="flex items-center gap-2">
            <img
              className="h-12 w-12 object-cover shadow-md rounded-full border-1"
              src={`${import.meta.env.VITE_BASE_URL}${ride?.user.profileImage}`}
              alt="driver image"
            />
            <p className="text-lg font-bold capitalize">{ride?.user.firstName + " " + ride?.user.lastName}</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-1">
            <GiPathDistance className="font-bold" />
            <FaRegClock className="text-sm"/>
            </div>
            <div className="flex flex-col gap-1">
            <p className="text-[14px] font-bold uppercase">{ride?.distance}</p>
            <p className="text-[12px] font-bold">{ride?.duration}</p>
            </div>
          </div>
          
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaMapLocationDot className="text-indigo-500"/>
          <h2 className="text-sm font-bold">Pickup Location</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-[-3px] ml-[29px] ">
          {" "}
          {ride?.pickUpAddress}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaLocationArrow className="text-indigo-500"/>
          <h2 className="text-sm font-bold">Destination Location</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-[-3px] ml-[29px] ">
          {" "}
          {ride?.destination}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaIndianRupeeSign className="text-indigo-500"/>
          <div className="flex items-center">
            <h2 className="text-md font-bold">{ride?.fare}</h2>
          </div>
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <Link
          onClick={() => {
            confirmRide()
          }}
          to="/driver-riding"
          className=" inline-block text-center shadow-lg bg-indigo-500 active:bg-indigo-600 text-white text-md font-bold w-full rounded-lg px-4 py-1 mt-4"
        >
          Confirm
        </Link>
        <button
          onClick={() => {
            setNewRideConfirmationPanel(false);
            setnewRideAvailablePanel(false);
          }}
          className=" bg-red-500 active:bg-red-500 text-white shadow-lg text-md font-bold w-full rounded-lg px-4 py-1 mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewRideConfirmation;
