import { RiUser3Fill } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";

const RideSelection = () => {
  return (
    <div className="fixed w-full rounded-t-lg shadow-t-lg bg-white z-10 bottom-0 px-3 py-3 translate-y-full">
        <h1 className="text-2xl font-bold">Select a ride</h1>
        <div className="px-4 gap-3 py-2 h-15  bg-zinc-100 flex justify-between items-center active:border-2 my-2 rounded-lg">
         <img className="h-10 w-17" src="../car-2.png" alt="car image" />
         <div>
            <h2 className="flex items-center">Sedan<span className="text-xs ml-2 flex items-center gap-[2px]"><RiUser3Fill/><span>4</span></span></h2>
            <p className="text-xs flex items-center gap-1 justify-center">2 mins away 
            </p>
         </div>
         <div>
            <h2 className="flex items-center">
                <span className="text-black"><span className="text-md font-bold"><FaIndianRupeeSign/></span></span><span className="font-bold">280</span>
            </h2>
         </div>
            
        </div>
        <div className="px-4 gap-3 py-2 h-15  bg-zinc-100 flex justify-between items-center rounded-lg active:border-2">
         <img className="h-10 w-17" src="../auto.png" alt="car image" />
         <div>
            <h2 className="flex items-center">Auto<span className="text-xs ml-2 flex items-center gap-[2px]"><RiUser3Fill/><span>3</span></span></h2>
            <p className="text-xs flex items-center  justify-center">2 mins away 
            </p>
         </div>
         <div>
            <h2 className="flex items-center">
                <span className="text-black"><span className="text-md font-bold"><FaIndianRupeeSign/></span></span><span className="font-bold">123</span>
            </h2>
         </div>
            
        </div>
        <div className="px-4 gap-3 py-2 my-2 h-15  bg-zinc-100 flex justify-between items-center rounded-lg active:border-2">
         <img className="h-10 w-17" src="../moto.png" alt="car image" />
         <div>
            <h2 className="flex items-center">Moto<span className="text-xs ml-2 flex items-center gap-[2px]"><RiUser3Fill/><span>2</span></span></h2>
            <p className="text-xs flex items-center  justify-center">2 mins away 
            </p>
         </div>
         <div>
            <h2 className="flex items-center">
                <span className="text-black"><span className="text-md font-bold"><FaIndianRupeeSign/></span></span><span className="font-bold">78</span>
            </h2>
         </div>
            
        </div>
        
    </div>
  )
}

export default RideSelection