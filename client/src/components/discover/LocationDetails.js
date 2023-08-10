import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useParams } from "react-router-dom"; 

const GoogleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const LocationDetails = () => {
    const { locationId } = useParams(); 

    console.log(locationId)

    const [formattedAddress, setFormattedAddress] = useState("");
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`http://localhost:3636/api/location/location/${locationId}`, {headers});
                const data = response.data;
                setFormattedAddress(data.formattedAddress);
                setLocation(data.location);
            } catch (error) {
                console.error("Error fetching location details:", error);
            }
        };

        fetchLocation();
    }, [locationId]);

    return (
        <div>
            <h2>Location Details</h2>
            <LoadScript googleMapsApiKey={GoogleApiKey}>
                <div style={{ height: "300px", width: "600px" }}>
                    <GoogleMap
                        id="location-details-map"
                        mapContainerStyle={{ height: "100%", width: "100%" }}
                        zoom={15}
                        center={location}
                    >
                        <Marker position={location} />
                    </GoogleMap>
                </div>
            </LoadScript>
            <div>{formattedAddress}</div>
        </div>
    );
};

export default LocationDetails;
