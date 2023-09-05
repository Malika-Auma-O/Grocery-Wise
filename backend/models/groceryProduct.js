const mongoose = require('mongoose');

const GroceryProductSchema = new mongoose.Schema({
    title: String,
    link: String,
    imgSrc: String,
    brand: String,
    price: String,
    code: String,
    reducedPrice: String,
    deletedPrice: String,
    finalMeasurementPrice: String,
    originalMeasurementPrice: String,
    highlightMeasurementPrice: String,
    unitPrice: String,
    sellingPrice: String,
    listPrice: String,
    source: {
        type: String,
        required: true,
        enum: ['MyMarket', 'Bazaar', 'Sklavenitis'] 
    }
    // I will add more fields later if i need
});

const GroceryProduct = mongoose.model('GroceryProduct', GroceryProductSchema);
module.exports = GroceryProduct;
