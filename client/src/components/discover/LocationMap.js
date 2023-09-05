import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios"; 

const GoogleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const LocationMap = () => {
  
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    const [address, setAddress] = useState("");
    const [formattedAddress, setFormattedAddress] = useState("");
    const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

    const handleGeocode = async () => {
        try {
            const response = await axios.get(`https://grocery-wise.onrender.com/api/location/${address}`, {headers});
            const data = response.data;
            setLocation(data.location);
            setFormattedAddress(data.formattedAddress);
            setMapCenter(data.location);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={GoogleApiKey}>
                <GoogleMap
                    id="geocode-map"
                    mapContainerStyle={{ height: "400px", width: "800px" }}
                    zoom={15}
                    center={mapCenter}
                >
                    <Marker position={location} />
                </GoogleMap>
            </LoadScript>
            <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            <button onClick={handleGeocode}>Geocode</button>
            <p>Address: {formattedAddress}</p>
        </div>
    );
};

export default LocationMap;
