import { IoLocation } from "react-icons/io5";

const LocationPanel = () => {
 
  const locations = [
    "234/34 Main Road, Bangalore",
    "34/4 News street, Mumbai",
    "4B Complex, Chennai"
  ]

  return (
    <div className="my-4">
       {locations.map((location, index) => (
         <div key={index} className="h-12 w-[90%]  bg-zinc-200 border-zinc-400 mx-4 my-[8px] rounded-xl p-2 flex gap-2  items-center">
         <IoLocation className="text-xl bg-slate-100 rounded-full text-black p-[6px] flex items-center h-7 w-9" />
         <p className="text-black text-xs">
          {location}
         </p>
        </div>
       ))}
     </div>
  )
}

export default LocationPanel