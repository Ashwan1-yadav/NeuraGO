import { useState, useRef,useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
import { FaCar } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import LocationPanel from "../components/LocationPanel";
import RideSelection from "../components/RideSelection";
import RideConfirmation from "../components/RideConfirmation";
import LookingForDriver from "../components/LookingForDriver";
import RideDriverInfo from "../components/RideDriverInfo";
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from "../context/UserContext";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [locationSuggestions, setlocationSuggestions] = useState([]);
  const [destinationSuggestions, setdestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [destination, setDestination] = useState("");
  const [rideFare, setrideFare] = useState(0);
  const [searchPanel, setSearchPanel] = useState(false);
  const [rideSelectionPanel, setrideSelectionPanel] = useState(false);
  const [rideConfirmationPanel, setrideConfirmationPanel] = useState(false);
  const [lookingForDriverPanel, setlookingForDriverPanel] = useState(false);
  const [RideDriverInfoPanel, setRideDriverInfoPanel] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);

  const searchPanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseButtonRef = useRef(null);

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  
  useEffect(() => {
    if(user !== ""){
      socket.emit("join",{userType:"user",userId:user._id,firstName:user.firstName})
    }
  },[user, socket])
 
  const submithandler = async (e) => {
    e.preventDefault();
  };

  const handleLocationChange = async (e) => {
    setLocation(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/getSuggestedLocations`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setlocationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/getSuggestedLocations`,
        {
          params: { address: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user-token")}`,
          },
        }
      );
      setdestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  async function selectRide(){
    setrideSelectionPanel(true)
    setSearchPanel(false)

    const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/getRideFare`,{
      params : {
        location,
        destination,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
    setrideFare(result.data)
  }

  async function createRide(){
    const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/createRide`,{
      pickUpAddress: location,
      destination,
      vehicleType,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user-token")}`,
      },
    })
    setrideFare(result.data)
  }

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(searchPanelRef.current, {
      height: searchPanel ? "70%" : "0%",
      duration: 0.5,
      ease: "power2.inOut",
    })
      .to(
        panelCloseButtonRef.current,
        {
          opacity: searchPanel ? "1" : "0",
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
      .to(
        panelRef.current,
        {
          borderRadius: searchPanel ? "0px" : "16px",
          border: "none",
          backgroundColor: searchPanel ? "#fff" : "transparent",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.4"
      );
  }, [searchPanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <p className="w-26 h-8 flex justify-center items-center absolute left-3 top-3  text-zinc-600 font-bold  bg-transparent rounded-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-8 border border-gray-500 text-[22px] text-center text-gray-200 shadow-lg">
        NeuraGO
      </p>
      <div className="h-screen w-screen">
        <img
          src="../dashboard-background.png"
          alt="Map Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full border-1 border-zinc-900 shadow-2xl">
        <div
          ref={panelRef}
          className="bg-transparent  bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-500 rounded-t-2xl shadow-t-2xl shadow-black h-[30%] relative p-5"
        >
          <h2 className="font-bold text-zinc-800 text-2xl mt-[-10px] mb-3 flex">
            <p ref={panelCloseButtonRef}>
              <MdOutlineKeyboardDoubleArrowDown
                onClick={() => {
                  setSearchPanel(false);
                }}
                className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1  mr-2 absolute  top-5  right-2"
              />
            </p>
            <FaCar className="text-3xl mr-2" />
            Book a ride
          </h2>
          <form onSubmit={(e) => submithandler(e)}>
            <IoLocationSharp className="absolute top-16 left-7 text-zinc-400 text-lg" />
            <input
              value={location}
              onChange={handleLocationChange}
              onClick={() => {
                setSearchPanel(true)
                setActiveField("location")
              }}
              className="outline-zinc-500 px-8 py-2 rounded-lg w-full h-8 text-sm placeholder:text-[17px] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-3xl shadow-md bg-opacity-10 border-1 border-zinc-600 mb-2"
              type="text"
              placeholder="Search for a place or address"
            />

            <FaLocationArrow className="absolute top-26 left-7 text-zinc-400 text-lg" />
            <input
              value={destination}
              onClick={() => {
                setSearchPanel(true)
                setActiveField("destination")
              }}
              onChange={handleDestinationChange}
              className="outline-zinc-500 px-8 py-2 rounded-lg w-full h-8 text-sm placeholder:text-[17px] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-3xl shadow-md bg-opacity-10 border-1 border-zinc-600 mb-2"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          
        </div>
        <div ref={searchPanelRef} className="bg-zinc-100 h-0">
          <LocationPanel
            selectRide={selectRide}
            setrideSelectionPanel={setrideSelectionPanel}
            setSearchPanel={setSearchPanel}
            activeField={activeField}
            setDestination={setDestination}
            setLocation={setLocation}
            suggestions={activeField === "location" ? locationSuggestions : destinationSuggestions}
          />
        </div>
        <div>
          <RideSelection
            rideSelectionPanel={rideSelectionPanel}
            setrideSelectionPanel={setrideSelectionPanel}
            setrideConfirmationPanel={setrideConfirmationPanel}
            rideFare={rideFare}
            setVehicleType={setVehicleType}
          />
        </div>
        <div>
          <RideConfirmation
            setlookingForDriverPanel={setlookingForDriverPanel}
            rideConfirmationPanel={rideConfirmationPanel}
            setrideConfirmationPanel={setrideConfirmationPanel}
            location={location}
            destination={destination}
            setDestination={setDestination}
            rideFare={rideFare}
            vehicleType={vehicleType}
            createRide={createRide}
          />
        </div>
        <div>
          <LookingForDriver
            lookingForDriverPanel={lookingForDriverPanel}
            setlookingForDriverPanel={setlookingForDriverPanel}
            setRideDriverInfoPanel={setRideDriverInfoPanel}
            location={location}
            vehicleType={vehicleType}
            destination={destination}
          />
        </div>
        <div>
          <RideDriverInfo
            RideDriverInfoPanel={RideDriverInfoPanel}
            setRideDriverInfoPanel={setRideDriverInfoPanel}
            setSearchPanel={setSearchPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
