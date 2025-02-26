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
        return "../car-2.png";
      case 'auto':
        return "../auto.png";
      case 'bike':
        return "../moto.png";
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
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white bottom-0 px-4 translate-y-full z-2"
      >
        <h1 className="text-2xl font-bold mt-2">Confirm your ride</h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setrideConfirmationPanel(false);
            }}
            className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
          />
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="flex justify-center items-center mt-[20px]">
          <img className="h-20 w-35 " src={getVehicleImage()} alt={`${vehicleType} image`} />
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaMapLocationDot />
          <h2 className="text-lg font-bold">Pickup Address</h2>
        </div>
        
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {location}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaLocationArrow />
          <h2 className="text-lg font-bold">Destination Address</h2>
        </div>
        
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {" "}
          {destination}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaIndianRupeeSign />
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
          className=" bg-green-400 active:bg-green-600 text-zinc-800 text-xl font-bold w-full rounded-lg px-4 py-1 mt-4 mb-2"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RideConfirmation;