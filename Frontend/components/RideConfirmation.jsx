/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";

const RideConfirmation = ({
  rideConfirmationPanel,
  setrideConfirmationPanel,
  setlookingForDriverPanel,
  location,
  destination,
  rideFare,
  vehicleType,
  createRide
}) => {
  const rideConfirmationPanelRef = useRef(null);

  const getVehiclePrice = (vehicleType,rideFare) => {
    switch(vehicleType) {
      case 'car':
        return rideFare.car;
      case 'auto':
        return rideFare.auto;
      case 'bike':
        return rideFare.bike;
      default:
        return 'Price';
    }
  }

  const getVehicleImage = () => {
    switch(vehicleType) {
      case 'car':
        return "../car3.png";
      case 'auto':
        return "../car2.png";
      case 'bike':
        return "../car.png";
      default:
        return "";
    }
  };

  useGSAP(() => {
    if (rideConfirmationPanel) {
      gsap.to(rideConfirmationPanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(rideConfirmationPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [rideConfirmationPanel]);

  return (
    <div>
      <div
        ref={rideConfirmationPanelRef}
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white bottom-0 px-4 translate-y-full z-2 pointer-events-auto"
      >
        <h1 className="text-2xl font-bold mt-2">Confirm your <span className="text-indigo-600">ride</span></h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setrideConfirmationPanel(false);
            }}
            className="text-xl bg-indigo-100 rounded-full h-5 w-5 p-1  mr-2 absolute  top-3 shadow-lg  right-2"
          />
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-indigo-50 shadow-md rounded-full h-28 w-28 flex justify-center items-center">
            <img src={getVehicleImage()} className="h-12 w-25" alt="" />
          </div>
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaMapLocationDot className="text-indigo-500 text-xl" />
          <h2 className="text-lg font-bold">Pickup Address</h2>
        </div>
        
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[33px]">
          {location}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaLocationArrow className="text-indigo-500 text-xl" />
          <h2 className="text-lg ml-[-2px] font-bold">Destination Address</h2>
        </div>
        
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[33px]">
          {" "}
          {destination}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaIndianRupeeSign className="text-indigo-500 text-xl" />
          <h2 className="text-lg font-bold">
            {
             getVehiclePrice(vehicleType,rideFare) 
            }
            </h2>
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <button
          onClick={() => {
            setlookingForDriverPanel(true);
            setrideConfirmationPanel(false);
            createRide();
          }}
          className="bg-[#535CE8] hover:bg-indigo-500 text-white font-bold py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg shadow-xl cursor-pointer my-4"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RideConfirmation;