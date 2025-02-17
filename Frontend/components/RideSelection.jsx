/* eslint-disable react/prop-types */
import { RiUser3Fill } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const RideSelection = ({
  rideSelectionPanel,
  setrideSelectionPanel,
  setrideConfirmationPanel,
  rideFare,
  setVehicleType,
}) => {
  const rideSelectionPanelRef = useRef(null);

  useGSAP(() => {
    if (rideSelectionPanel) {
      gsap.to(rideSelectionPanelRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(rideSelectionPanelRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [rideSelectionPanel]);

  return (
    <div
      ref={rideSelectionPanelRef}
      className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-10 bottom-0 px-3 py-3 translate-y-full"
    >
      <h1 className="text-2xl font-bold">Select a ride</h1>
      <p>
        <MdOutlineKeyboardDoubleArrowDown
          onClick={() => {
            setrideSelectionPanel(false);
          }}
          className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
        />
      </p>
      <div
        onClick={() => {
          setrideConfirmationPanel(true);
          setrideSelectionPanel(false);
          setVehicleType("car");
        }}
        className="px-4 gap-3 py-2 h-15  bg-zinc-100 flex justify-between items-center active:border-2 my-2 rounded-lg"
      >
        <img className="h-10 w-17" src="../car-2.png" alt="car image" />
        <div>
          <h2 className="flex items-center">
            Sedan
            <span className="text-xs ml-2 flex items-center gap-[2px]">
              <RiUser3Fill />
              <span>3</span>
            </span>
          </h2>
        </div>
        <div>
          <h2 className="flex items-center">
            <span className="text-black">
              <span className="text-md font-bold">
                <FaIndianRupeeSign />
              </span>
            </span>
            <span className="font-bold">{rideFare.car}</span>
          </h2>
        </div>
      </div>
      <div
        onClick={() => {
          setrideConfirmationPanel(true);
          setrideSelectionPanel(false);
          setVehicleType("auto");
        }}
        className="px-4 gap-3 py-2 h-15  bg-zinc-100 flex justify-between items-center rounded-lg active:border-2"
      >
        <img className="h-10 w-17" src="../auto.png" alt="car image" />
        <div>
          <h2 className="flex items-center">
            Auto
            <span className="text-xs ml-2 flex items-center gap-[2px]">
              <RiUser3Fill />
              <span>2</span>
            </span>
          </h2>
        </div>
        <div>
          <h2 className="flex items-center">
            <span className="text-black">
              <span className="text-md font-bold">
                <FaIndianRupeeSign />
              </span>
            </span>
            <span className="font-bold">{rideFare.auto}</span>
          </h2>
        </div>
      </div>
      <div
        onClick={() => {
          setrideConfirmationPanel(true);
          setrideSelectionPanel(false);
          setVehicleType("bike");
        }}
        className="px-4 gap-3 py-2 my-2 h-15  bg-zinc-100 flex justify-between items-center rounded-lg active:border-2"
      >
        <img className="h-10 w-17" src="../moto.png" alt="car image" />
        <div>
          <h2 className="flex items-center">
            Bike
            <span className="text-xs ml-2 flex items-center gap-[2px]">
              <RiUser3Fill />
              <span>1</span>
            </span>
          </h2>
        </div>
        <div>
          <h2 className="flex items-center">
            <span className="text-black">
              <span className="text-md font-bold">
                <FaIndianRupeeSign />
              </span>
            </span>
            <span className="font-bold">{rideFare.bike}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RideSelection;
