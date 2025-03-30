import React, { useState, useEffect, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { IoIosAdd, IoIosRemove } from 'react-icons/io'
import { MdMyLocation, MdLayers, MdSatellite, MdMap } from 'react-icons/md'

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const mapOptions = {
    disableDefaultUI: true,  
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy', 
    styles: [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        }
    ]
};

const RideTracking = ({ onMapLoad, customControls = false }) => {
    const [ currentPosition, setCurrentPosition ] = useState(center);
    const [ map, setMap ] = useState(null);
    const mapRef = useRef(null);
    const [ zoom, setZoom ] = useState(15);
    const [ mapType, setMapType ] = useState('roadmap');
    const [ showMapTypeOptions, setShowMapTypeOptions ] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition();
        const interval = setInterval(updatePosition, 1000);
        
        return () => clearInterval(interval);
    }, []);

    const handleMapLoad = (mapInstance) => {
        mapRef.current = mapInstance;
        setMap(mapInstance);
        if (onMapLoad) onMapLoad(mapInstance);
    };

    const panTo = () => {
        if (mapRef.current) {
            mapRef.current.panTo(currentPosition);
        }
    };

    const zoomIn = () => {
        if (mapRef.current) {
            const newZoom = Math.min(zoom + 1, 20);
            setZoom(newZoom);
            mapRef.current.setZoom(newZoom);
        }
    };

    const zoomOut = () => {
        if (mapRef.current) {
            const newZoom = Math.max(zoom - 1, 1);
            setZoom(newZoom);
            mapRef.current.setZoom(newZoom);
        }
    };

    const changeMapType = (type) => {
        if (mapRef.current) {
            setMapType(type);
            mapRef.current.setMapTypeId(type);
            setShowMapTypeOptions(false);
        }
    };

    const toggleMapTypeOptions = () => {
        setShowMapTypeOptions(prev => !prev);
    };

    return (
        <>
            <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={zoom}
                    options={mapOptions}
                    onLoad={handleMapLoad}
                    mapTypeId={mapType}
                >
                    <Marker position={currentPosition} />
                </GoogleMap>
            </LoadScript>
            
            {customControls && (
                <div className="map-controls flex flex-col absolute bottom-[35%] right-4">
                    <button 
                        onClick={zoomIn} 
                        className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center mb-2"
                        aria-label="Zoom in"
                    >
                        <IoIosAdd className="text-2xl text-gray-700" />
                    </button>
                    <button 
                        onClick={zoomOut} 
                        className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center mb-2"
                        aria-label="Zoom out"
                    >
                        <IoIosRemove className="text-2xl text-gray-700" />
                    </button>
                    <button 
                        onClick={panTo} 
                        className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center mb-2"
                        aria-label="Center map"
                    >
                        <MdMyLocation className="text-xl text-gray-700" />
                    </button>
                    <div className="relative">
                        <button 
                            onClick={toggleMapTypeOptions} 
                            className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center"
                            aria-label="Map type"
                        >
                            <MdLayers className="text-xl text-gray-700" />
                        </button>
                        
                        {showMapTypeOptions && (
                            <div className="absolute right-12 bottom-0 bg-white rounded-lg shadow-md p-2 flex flex-col">
                                <button 
                                    onClick={() => changeMapType('roadmap')} 
                                    className={`flex items-center px-3 py-2 rounded ${mapType === 'roadmap' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    <MdMap className="mr-2 text-gray-700" />
                                    <span className="whitespace-nowrap">Map</span>
                                </button>
                                <button 
                                    onClick={() => changeMapType('satellite')} 
                                    className={`flex items-center px-3 py-2 rounded ${mapType === 'satellite' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    <MdSatellite className="mr-2 text-gray-700" />
                                    <span className="whitespace-nowrap">Satellite</span>
                                </button>
                                <button 
                                    onClick={() => changeMapType('hybrid')} 
                                    className={`flex items-center px-3 py-2 rounded ${mapType === 'hybrid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    <MdLayers className="mr-2 text-gray-700" />
                                    <span className="whitespace-nowrap">Hybrid</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default RideTracking;