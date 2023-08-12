const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    address: String,
    formattedAddress: String,
    location: {
        lat: Number,
        lng: Number,
    },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
