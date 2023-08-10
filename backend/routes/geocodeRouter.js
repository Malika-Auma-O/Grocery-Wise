const express = require('express');
const { getLocation, getLocationById } = require('../controllers/geocodeController');
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/location/:address", verifyToken, getLocation);
router.get("/location/location/:locationId", verifyToken, getLocationById);

module.exports = router;
