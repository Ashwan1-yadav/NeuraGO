import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";
import { LuNotebookTabs } from "react-icons/lu";
import NewRideAvailable from "../components/NewRideAvailable";
import { useContext, useEffect, useState } from "react";
import { DriverDataContext } from "../context/DriverContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import DriverRiding from "./DriverRiding";

const DriverDashboard = () => {
  const { driver } = useContext(DriverDataContext);
  const { socket } = useContext(SocketContext);
  
  const [ride, setride] = useState(null)
  const [newRideAvailablePanel, setnewRideAvailablePanel] = useState(false);


  useEffect(() => {
    if (driver !== "") {
      socket.emit("join", {
        userType: "driver",
        userId: driver._id,
        firstName: driver.firstName,
      });
    }
    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("driver-location-update", {
            driverId: driver._id,
            latitude,
            longitude,
          });
        });
      }
    };
    updateLocation();
  }, [driver, socket]);

  socket.on("new_ride", (ride) => {
    setride(ride)
    setnewRideAvailablePanel(true);
  });

  async function acceptRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirmRide`, {
        rideId: ride._id,
        driverId: driver._id,
        
      },{
        headers: {
        Authorization: `Bearer ${localStorage.getItem("driver-token")}`,
        },
      });
      
      if (response.status === 200) {
        setnewRideAvailablePanel(false);
        socket.emit("ride_confirmed", {
          rideId: ride._id,
          driverId: driver._id
        });
      }

    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <p className="w-26 h-8 flex justify-center items-center absolute left-3 top-3  text-zinc-600 font-bold  bg-transparent rounded-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-8 border border-gray-500 text-[22px] text-center shadow-lg">
        NeuraGO
      </p>
      <div className="h-screen w-screen">
        <img
          src="../driver-home.gif"
          alt="Map Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="fixed w-full rounded-t-lg shadow-t-lg  bg-clip-padding backdrop-filter backdrop-blur-3xl bg-zinc-100 bg-opacity-8  bottom-0 px-3 py-3 translate-y-0">
        <div className="flex justify-between items-center">
          <div className="flex overflow-hidden  items-center gap-3">
            <img
              className="h-10 border-1 shadow-lg w-10 rounded-full  object-cover"
              src="../driver-placeholder.png"
              alt="driver image"
            />
            <h2 className="text-md font-bold capitalize">
              {driver.firstName} {driver.lastName}
            </h2>
          </div>
          <div className="flex flex-col text-md gap-[-14px]">
            <div className="flex items-center">
              <FaIndianRupeeSign />
              <h2 className="text-md font-bold">200</h2>
            </div>
            <p className="text-zinc-500 ml-[20px] text-[13px]">Earned</p>
          </div>
        </div>
        <hr className="mt-3 mb-3 border-zinc-300" />
        <div className="flex justify-around p-5 items-center h-16 w-full bg-orange-300 border-1 border-orange-600 shadow-lg rounded-xl ">
          <div className="text-lg flex flex-col  items-center">
            <FaRegClock className="text-md" />
            <p className="text-[15px]">Hours</p>
            <p className="text-[10px]">2 hrs</p>
          </div>
          <div className="text-lg flex flex-col items-center">
            <MdOutlineSpeed className="text-md" />
            <p className="text-[15px]">Speed</p>
            <p className="text-[10px]">50 km/h</p>
          </div>
          <div className="text-lg flex flex-col items-center">
            <LuNotebookTabs className="text-md" />
            <p className="text-[15px]">Pickup</p>
            <p className="text-[10px]">12</p>
          </div>
        </div>
      </div>
      <NewRideAvailable ride={ride} newRideAvailablePanel={newRideAvailablePanel} setnewRideAvailablePanel={setnewRideAvailablePanel} acceptRide={acceptRide} />
    </div>
  );
};

export default DriverDashboard;
