// geocodeMiddleware.js
const axios = require("axios");
const GoogleAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const geocodeLocation = async (location) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${GoogleAPIKey}`;

  try {
    const response = await axios.get(geocodeUrl);
    const data = response.data;
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      const { lat, lng } = result.geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
};

module.exports = { geocodeLocation };
