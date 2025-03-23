/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiMapPinUserFill } from "react-icons/ri";
import { FaLocationArrow } from "react-icons/fa6";


const LookingForDriver = ({
  lookingForDriverPanel,
  setlookingForDriverPanel,
  location,
  destination,
  vehicleType,
}) => {

  const lookingForDriverPanelRef = useRef(null);

  const getVehicleImage = () => {
    switch(vehicleType) {
      case 'car':
        return "../car-2.png";
      case 'auto':
        return "../auto.png";
      case 'bike':
        return "../moto.png";
      default:
        return "Vehicle Image";
    }
  };

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
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-1 bottom-0 px-3 py-3 translate-y-full"
      >
        <h1 className="text-xl gap-2 font-bold flex items-center">
          <RiMapPinUserFill/>Looking For Driver ...</h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setlookingForDriverPanel(false);
            }}
            className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
          />
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="flex justify-center items-center mt-[20px]">
          <img className="h-20 w-35 " src={getVehicleImage()} alt={`Vehicle image`} />
        </div>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaMapLocationDot />
          <h2 className="text-lg font-bold">Pickup Address</h2>
        </div>
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {" "}
          {location}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaLocationArrow />
          <h2 className="text-lg font-bold">Destination Address</h2>
        </div>
        <p className="text-[18px] text-zinc-500 mt-[-8px] ml-[29px]">
          {" "}
          {destination}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
      </div>
    </div>
  );
};

export default LookingForDriver;