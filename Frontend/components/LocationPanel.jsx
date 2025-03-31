/* eslint-disable react/prop-types */
import { IoLocation } from "react-icons/io5";
import PropTypes from "prop-types";

const LocationPanel = ({
  suggestions,
  activeField,
  setDestination,
  setLocation,
}) => {
  const handleSuggestionClick = (suggestions) => {
    if (activeField === "location") {
      setLocation(suggestions);
    } else {
      setDestination(suggestions);
    }
  };

  return (
    <>
      <div className="my-2 pointer-events-auto">
        {suggestions.map((location, index) => (
          <div
            onClick={() => {
              handleSuggestionClick(location);
            }}
            key={index}
            className="h-12 w-[90%]  bg-indigo-100 border-zinc-400 mx-4 my-[8px] rounded-xl p-2 flex gap-2  items-center active:border-2"
          >
            <IoLocation className="text-xl bg-slate-100 rounded-full text-indigo-600 p-[6px] flex items-center h-7 w-9" />
            <p className="text-black text-xs">
              {location.length > 35
                ? location.substring(0, 35) + "..."
                : location}
            </p>
          </div>
        ))}
      </div>
      
    </>
  );
};

LocationPanel.propTypes = {
  setrideSelectionPanel: PropTypes.func.isRequired,
  setSearchPanel: PropTypes.func.isRequired,
};

export default LocationPanel;
