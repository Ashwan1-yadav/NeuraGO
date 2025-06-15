import { useState, useRef,useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { IoLocationSharp } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa6";
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
import { FaSearch } from "react-icons/fa";


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
        //
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
        // console.log("error in fetching destination suggestions : ", e);
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
      height: searchPanel ? "80%" : "0%",
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
    <div className="h-screen w-screen relative overflow-hidden ">
      <div className="h-74 w-87 border-2 border-zinc-700  absolute top-[38%] left-[5%] rounded-lg z-10  flex items-center">
        <RideTracking 
          customControls={true}
          onMapLoad={(mapInstance) => {
            window.mapInstance = mapInstance;
          }}
        />
      </div>
      <div className="absolute top-2 left-3 right-0 rounded-md z-10 h-24 w-[94%] bg-yellow-500 flex items-center">
      <div className="w-[50%] p-5">
        <p className="text-xl flex flex-col text-black font-bold">Your journey<span className="text-indigo-500">starts here.</span></p>
      </div>
      <div className="w-[50%] p-5 flex justify-around">
        <img src="../phone.png" className="h-24 w-17" alt="" />
      </div>
      </div>

     <div className=" gap-2">
     <div className="flex justify-around p-1  items-center h-28 w-full bg-white-300 rounded-md mt-30 ">
          <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-indigo-50 rounded-full h-18 w-18 flex justify-center items-center">
            <img src="../car.png" className="h-8 w-20" alt="" />
          </div>
          <p className="text-[14px]">Standard 3-seat</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-indigo-50 rounded-full h-18 w-18 flex justify-center items-center">
            <img src="../car2.png" className="h-8 w-20" alt="" />
          </div>
          <p className="text-[14px]">Premium 2-seat</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-indigo-50 rounded-full h-18 w-18 flex justify-center items-center">
            <img src="../car3.png" className="h-8 w-25" alt="" />
          </div>
          <p className="text-[14px]">Luxury 1-seat</p>
          </div>
        </div>
     </div>
     <div className="px-4 mt-4">
      <h1 className="text-xl font-bold">Your current location</h1>
     </div>
      
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full border-1 border-zinc-900 shadow-2xl z-10 pointer-events-none">
        <div
          ref={panelRef}
          className="bg-transparent bg-clip-padding  backdrop-blur-2xl bg-opacity-10 border border-gray-500 rounded-t-2xl shadow-lg h-[20%] relative p-5 pointer-events-auto"
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
          <p className="text-xl font-bold">Get a <span className="text-indigo-600">ride</span></p>
          </h2>
          <div className="flex items-center justify-center">
          <form onSubmit={(e) => submithandler(e)}>
            <IoLocationSharp className="absolute top-15 left-7 text-indigo-500 text-lg" />
            <input
              value={location}
              onChange={handleLocationChange}
              onClick={() => {
                setSearchPanel(true)
                setActiveField("location")
              }}
              className="outline-zinc-500 px-8 py-2 rounded-lg w-[91%] h-8 text-sm placeholder:text-[17px] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-3xl shadow-md bg-opacity-10 border-1 border-zinc-600 mb-2"
              type="text"
              placeholder="Search for a place or address"
            />

            <FaLocationArrow className="absolute top-25 left-7 text-indigo-500 text-lg" />
            <input
              value={destination}
              onClick={() => {
                setSearchPanel(true)
                setActiveField("destination")
              }}
              onChange={handleDestinationChange}
              className="outline-zinc-500 px-8 py-2 rounded-lg w-[91%] h-8 text-sm placeholder:text-[17px] bg-transparent bg-clip-padding backdrop-filter backdrop-blur-3xl shadow-md bg-opacity-10 border-1 border-zinc-600 mb-2"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
           <div onClick={()=>{selectRide()}} className="h-9 w-10 bg-indigo-50 rounded-full border-1 border-indigo-500 flex justify-center items-center cursor-pointer">
             <FaSearch className="text-xl text-indigo-500 p-[6px] flex items-center h-7 w-9" />
           </div>
          </div>
          
        </div>
        <div ref={searchPanelRef} className="bg-zinc-100 h-0">
          <LocationPanel
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
            rideFare={rideFare}
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
