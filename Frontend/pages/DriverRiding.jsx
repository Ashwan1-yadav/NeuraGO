import { Link } from "react-router-dom";
import { FaAngleUp } from "react-icons/fa6";
import { useState } from "react";
import FinishRide from "../components/FinishRide";

const DriverRiding = () => {
  const [finishRidePanel, setfinishRidePanel] = useState(false);

  return (
    <div>
      <p className="w-26 h-8 flex justify-center items-center absolute left-3 top-3  text-zinc-600 font-bold  bg-transparent rounded-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-8 border border-gray-500 text-[22px] text-center text-gray-200 shadow-lg">
        NeuraGO
      </p>
      <div className="h-screen w-screen">
        <img
          src="../driver-home.gif"
          alt="Map Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="fixed w-full rounded-t-lg shadow-t-lg bg-yellow-400 flex items-center  shadow-lg bottom-0 px-3 py-3">
        <div
          onClick={() => {
            setfinishRidePanel(true);
          }}
          className="flex flex-col justify-between w-full items-center"
        >
          <FaAngleUp
            className="text-zinc-800 mb-2"
            onClick={() => {
              setfinishRidePanel(true);
            }}
          />
          <h1 className="font-bold">2 KM away</h1>
          <Link className="bg-yellow-500 active:bg-yellow-600 text-zinc-900 shadow-lg text-md font-bold w-[1/2] rounded-full px-4 py-1 mt-1">
            Pick Up Passenger
          </Link>
        </div>
      </div>
      <FinishRide
        finishRidePanel={finishRidePanel}
        setfinishRidePanel={setfinishRidePanel}
      />
    </div>
  );
};

export default DriverRiding;
