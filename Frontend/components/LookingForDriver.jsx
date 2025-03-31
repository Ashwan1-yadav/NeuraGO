/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiMapPinUserFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";



const LookingForDriver = ({
  lookingForDriverPanel,
  location,
  destination,
  vehicleType,
  rideFare,
  setlookingForDriverPanel
}) => {

  const lookingForDriverPanelRef = useRef(null);

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

  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [lookingForDriverPanel]);

  return (
    <div>
      <div
        ref={lookingForDriverPanelRef}
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-1 bottom-0 px-3 py-3 translate-y-full pointer-events-auto"
      >
        <h1 className="text-xl gap-2 font-bold flex items-center justify-center">
          <RiMapPinUserFill className="text-indigo-500 text-xl" />
          <span className="text-md flex justify-center items-center gap-1">Connecting to a <span className="text-indigo-600">driver</span></span>
        </h1>
        <div className="flex flex-col justify-center items-center gap-1 my-8">
          <div className="bg-indigo-50 shadow-md rounded-full h-23 w-23 gap-2 flex flex-col justify-center items-center">
            <img src="../spark.png" className="h-7 mt-[-40px]" alt="" />
            <img src={getVehicleImage()} className="h-10 w-20" alt="" />
          </div>
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaMapLocationDot className="text-indigo-500 text-xl" />
          <h2 className="text-lg font-bold">Pickup Address</h2>
        </div>
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {" "}
          {location}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaLocationArrow className="text-indigo-500 text-xl" />
          <h2 className="text-lg font-bold">Destination Address</h2>
        </div>
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {" "}
          {destination}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
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
            setlookingForDriverPanel(false);
          }}
          className="hover:bg-indigo-500 text-red-500 bg-red-100  py-2 px-2 rounded-lg w-full text-[20px] text-center text-lg cursor-pointer border-1 border-red-300 my-4"
        >Cancel Trip</button>
      </div>
    </div>
  );
};

export default LookingForDriver;