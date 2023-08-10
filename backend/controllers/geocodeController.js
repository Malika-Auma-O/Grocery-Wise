const express = require('express');
require("dotenv").config();
const GoogleApiKey = process.env.GOOGLE_MAPS_API_KEY;
const Location = require("../models/location")

const getLocation = async (req, res) => {
    const address = req.params.address;
    const userId = req.user.userId;
  
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&result_type=street_address&key=${GoogleApiKey}`;
  
    try {
      const response = await fetch(url);
      const json = await response.json();
  
      if (json.status === 'OK') {
        const result = json.results[0];
        const locationData = {
          userId: userId,
            address: address,
            formattedAddress: result.formatted_address,
            location: result.geometry.location,
        };

        const newLocation = new Location(locationData);
        await newLocation.save();

        res.send(locationData);
      } else {
        res.status(400).send({error: 'Location not found'});
      }
  
    } catch (error) {  
      res.status(500).send({error: 'Error contacting Google Maps API'});
    }
  }


const getLocationById = async (req, res) => {
    const locationId = req.params.locationId;
    const userId = req.user.userId;

    try {
        const location = await Location.findOne({ _id: locationId, userId: userId });
        if (location) {
            res.send(location);
        } else {
            res.status(404).send({error: 'Location not found'});
        }
    } catch (error) {
        res.status(500).send({error: 'Error fetching location'});
    }
};

module.exports = {
    getLocation,
    getLocationById,
};