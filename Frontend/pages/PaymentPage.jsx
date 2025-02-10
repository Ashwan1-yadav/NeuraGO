import { useRef } from "react";
import {Link} from "react-router-dom"
import { FaMapLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const PaymentPage = () => {
  const RideDriverInfoPanelRef = useRef(null);

return (
    <div>
      <div
        ref={RideDriverInfoPanelRef}
        className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-10 bottom-0 h-screen px-3 py-3 translate-y-0"
      >
        <h1 className="text-xl gap-2 font-bold flex items-center">
          <MdOutlinePayment/>Payment</h1>
        <Link to="/dashboard">
          <IoClose
            className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
          />
        </Link>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="flex justify-between  items-center mt-[20px]">
          <img className="h-17 w-30 " src="../car-2.png" alt="car image" />
          <div className="flex flex-col">
          <h1 className="text-xl font-bold flex items-center gap-1">Driver Name</h1>
          <h1 className="text-lg text-zinc-700 ml-8">Vehicle No</h1>
          <h1 className="text-sm text-zinc-400 ml-6">Vehicle Details</h1>
          </div>
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaMapLocationDot />
          <h2 className="text-xl font-bold">Address</h2>
        </div>
        <p className="test-md text-zinc-400 mt-[-8px] ml-[29px]">
          {" "}
          full address
        </p>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <div className="h-10 w-[90%] flex items-center gap-2">
          <FaIndianRupeeSign />
          <h2 className="text-xl font-bold">Price</h2>
        </div>
        <hr className="mt-4 mb-2 border-zinc-200" />
        <button className="bg-green-400 text-black rounded-lg font-bold px-4 py-2 mt-4 flex justify-center items-center w-full active:bg-green-600">Make Payment</button>
        </div>
    </div>
  );
};

export default PaymentPage;
