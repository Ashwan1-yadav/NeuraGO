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
import {RideDataContext} from "../context/RideContext";
import PaymentPage from "../components/PaymentPage";
import RideTracking from "../components/RideTracking";

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
  const [driverDetails, setDriverDetails] = useState(null);
  const [locationDebounceTimer, setLocationDebounceTimer] = useState(null);
  const [destinationDebounceTimer, setDestinationDebounceTimer] = useState(null);
  const [paymentPage, setpaymentPage] = useState(false);

  const searchPanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseButtonRef = useRef(null);

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);
  const {setRideContext} = useContext(RideDataContext);
  
  useEffect(() => {
    if(user !== ""){
      socket.emit("join",{userType:"user",userId:user._id,firstName:user.firstName})
    }
  },[user, socket])
 
  const submithandler = async (e) => {
    e.preventDefault();
  };

  socket.on("ride_confirmed", (data) => {
    setRideDriverInfoPanel(true);
    setlookingForDriverPanel(false);
    setDriverDetails(data);
  });

  socket.on("ride_ongoing", (data) => {
    setRideContext(data)
    setpaymentPage(true)
    setRideDriverInfoPanel(false);
  });

  socket.on("ride_finished", (data) => {
    setRideContext(data)
    setpaymentPage(false)
  });

  const handleLocationChange = async (e) => {
    setLocation(e.target.value);
    
    if (locationDebounceTimer) clearTimeout(locationDebounceTimer);
    
    const newTimer = setTimeout(async () => {
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
      } catch(e) {
        console.log("error in location suggestion api : ", e);
      }
    }, 500);
    
    setLocationDebounceTimer(newTimer);
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    
    if (destinationDebounceTimer) clearTimeout(destinationDebounceTimer);
    
    const newTimer = setTimeout(async () => {
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
      } catch(e) {
        console.log("error in fetching destination suggestions : ", e);
      }
    }, 500);
    
    setDestinationDebounceTimer(newTimer);
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
      <div className="h-screen w-screen relative z-10">
        <RideTracking 
          customControls={true}
          onMapLoad={(mapInstance) => {
            window.mapInstance = mapInstance;
          }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <p className="w-26 h-8 flex justify-center items-center absolute left-3 top-3 text-zinc-600 font-bold bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-8 border border-gray-500 text-[22px] text-center shadow-lg pointer-events-auto">
          NeuraGO
        </p>
        <p className="w-36 h-8 flex gap-3 p-3 items-center absolute right-3 top-3 text-zinc-600 font-bold bg-white rounded-full bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-8 border border-gray-500 text-[22px] text-center shadow-lg pointer-events-auto">
          <img src={`${import.meta.env.VITE_BASE_URL}${user?.profileImage}`} alt="profile-image" className="w-6 border-1 h-6 rounded-full object-cover" />
          <span>{user?.firstName + " " + user?.lastName}</span>
        </p>
      </div>
      
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full border-1 border-zinc-900 shadow-2xl z-10 pointer-events-none">
        <div
          ref={panelRef}
          className="bg-transparent bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-500 rounded-t-2xl shadow-lg h-[30%] relative p-5 pointer-events-auto"
        >
          <h2 className="font-bold text-zinc-800 text-2xl mt-[-10px] mb-3 flex items-center">
            <p ref={panelCloseButtonRef} className="absolute top-5 right-2">
              <MdOutlineKeyboardDoubleArrowDown
                onClick={() => {
                  setSearchPanel(false);
                }}
                className="text-xl bg-zinc-200 rounded-full h-5 w-5 p-1 cursor-pointer hover:bg-zinc-300 transition-colors"
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
            driverDetails={driverDetails}
          />
        </div>
        <div>
          <PaymentPage paymentPage={paymentPage} setpaymentPage={setpaymentPage} driverDetails={driverDetails}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
