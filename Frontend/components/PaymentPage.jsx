/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa6";

const PaymentPage = ({
  paymentPage,
  setpaymentPage,
  driverDetails,
}) => {
  const PaymentPageRef = useRef(null);

  useGSAP(() => {
    if (paymentPage) {
      gsap.to(PaymentPageRef.current, {
        transform: "translateY(0%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(PaymentPageRef.current, {
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [paymentPage]);

  return (
    <div>
      <div
        ref={PaymentPageRef}
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-10 bottom-0 px-3 py-3 translate-y-0"
      >
        <h1 className="text-xl gap-2 font-bold flex items-center">
          <FaAddressCard/>Payment Page</h1>
        <p>
          <MdOutlineKeyboardDoubleArrowDown
            onClick={() => {
              setpaymentPage(false);
            }}
            className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
          />
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="flex justify-between  items-center mt-[20px]">
          <img className="h-17 w-30 " src="../car-2.png" alt="car image" />
          <div className="flex flex-col">
          <h1 className="text-xl font-bold flex items-center gap-1 capitalize">{driverDetails?.driver?.firstName} {driverDetails?.driver?.lastName}</h1>
          <h1 className="text-lg text-zinc-700 font-mono font-bold ">{driverDetails?.driver?.vehicleNoPlate}</h1>
          <h1 className="text-sm text-zinc-500 capitalize">{}  {driverDetails?.driver?.vehicleType} <span className="text-black">|</span> {driverDetails?.driver?.vehicleColor}</h1>
          </div>
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaMapLocationDot />
          <h2 className="text-sm font-bold">Pickup Location</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-[-3px] ml-[29px] ">
          {" "}
          {driverDetails?.pickUpAddress}
        </p>
        <hr className="mt-2 mb-2 border-zinc-200" />
        <div className="h-7 w-[90%] flex items-center gap-2">
          <FaLocationArrow />
          <h2 className="text-sm font-bold">Destination Location</h2>
        </div>
        <p className="text-xs text-zinc-500 mt-[-3px] ml-[29px] ">
          {" "}
          {driverDetails?.destination}
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaIndianRupeeSign />
          <h2 className="text-xl font-bold">{driverDetails?.fare}</h2>
        </div>
        <hr className="mt-4 border-zinc-200" />
        <button className="bg-green-400 text-black rounded-lg font-bold px-4 py-2 mt-4 flex justify-center items-center w-full active:bg-green-600">Make Payment</button> 
      </div>
    </div>
  );
};

export default PaymentPage;
