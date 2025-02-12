/* eslint-disable react/prop-types */
import { GiPathDistance } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsCashStack } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const NewRideConfirmation = ({
  NewRideConfirmationPanel,
  setNewRideConfirmationPanel,
  setnewRideAvailablePanel,
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

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <div
        ref={NewRideConfirmationPanelRef}
        className="fixed w-full h-screen rounded-t-lg shadow-t-lg bg-white  bottom-0 px-3 py-3"
        style={{ transform: "translateY(0%)" }}
      >
        <h1 className="text-xl font-bold">Confirm your ride</h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setNewRideConfirmationPanel(false);
            }}
            className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-4  right-2"
          />
        </p>
        <hr className="border-zinc-300 mt-2 mb-2" />
        <div className="flex justify-between items-center bg-yellow-300 p-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <img
              className="h-8 w-8 object-cover rounded-full border-1"
              src="../driver-placeholder.png"
              alt="driver image"
            />
            <p className="text-sm font-bold">Passenger Name</p>
          </div>
          <div className="flex items-center gap-1">
            <GiPathDistance className="text-md font-bold" />
            <p className="text-xs font-medium">2.73 KM</p>
          </div>
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaMapLocationDot />
          <h2 className="text-lg font-bold">Address</h2>
        </div>
        <p className="text-xs text-zinc-400 mt-[-3px] ml-[29px] ">
          {" "}
          full address
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <BsCashStack />
          <div className="flex items-center">
            <FaIndianRupeeSign />
            <h2 className="text-md font-bold">200</h2>
          </div>
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <Link
          to="/driver-riding"
          className=" inline-block text-center shadow-lg bg-green-400 active:bg-green-600 text-zinc-800 text-md font-bold w-full rounded-lg px-4 py-1 mt-4"
        >
          Confirm
        </Link>
        <button
          onClick={() => {
            setNewRideConfirmationPanel(false);
            setnewRideAvailablePanel(false);
          }}
          className=" bg-red-500 active:bg-red-500 text-zinc-800 shadow-lg text-md font-bold w-full rounded-lg px-4 py-1 mt-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewRideConfirmation;
