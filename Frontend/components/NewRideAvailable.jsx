import { GiPathDistance } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NewRideConfirmation from "./NewRideConfirmation";
import { FaLocationArrow } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { FaCar } from "react-icons/fa";


const NewRideAvailable = ({newRideAvailablePanel, setnewRideAvailablePanel,ride,acceptRide}) => {

  const [NewRideConfirmationPanel, setNewRideConfirmationPanel] = useState(false);

  const newRideAvailablePanelRef = useRef(null);

  useGSAP(
    () => {
      if (newRideAvailablePanel) {
        gsap.to(newRideAvailablePanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(newRideAvailablePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [newRideAvailablePanel] }
  );

  return (
    <div>
      <div
        ref={newRideAvailablePanelRef}
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white bottom-0 px-3 py-3 z-4"
        style={{ transform: "translateY(0%)" }}
      > 
      <div className="flex gap-2 justify-center items-center">
      <FaCar className="text-indigo-500 text-2xl" />
      <h1 className="text-xl font-bold">New <span className="text-indigo-600">Ride</span> Available !</h1>
      </div>

        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setnewRideAvailablePanel(false);
            }}
            className="text-xl bg-indigo-100 rounded-full h-5 w-5 p-1  mr-2 absolute  top-4  right-2"
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
          <FaMapLocationDot className="text-indigo-500" />
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
            <h2 className="text-md text-indigo-500 font-bold">{ride?.fare}</h2>
          </div>
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <button onClick={() => {
            acceptRide()
            setNewRideConfirmationPanel(true);
            setnewRideAvailablePanel(false);
          }} className=" bg-indigo-500 active:bg-indigo-600 text-white text-md font-bold w-full rounded-lg px-4 py-1 mt-4">
          Accept
        </button>
        <button
          onClick={() => {
            setnewRideAvailablePanel(false);
          }}
          className=" bg-zinc-300 active:bg-zinc-400 text-zinc-800 text-md font-bold w-full rounded-lg px-4 py-1 mt-2"
        >
          Ignore
        </button>
      </div>
      <div>
      <NewRideConfirmation NewRideConfirmationPanel = {NewRideConfirmationPanel} setNewRideConfirmationPanel ={setNewRideConfirmationPanel}
      setnewRideAvailablePanel = {setnewRideAvailablePanel}
      ride = {ride}
      />
      </div>
    </div>
  );
};

export default NewRideAvailable;
