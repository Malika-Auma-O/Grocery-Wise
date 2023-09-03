const express = require("express");
const {getSearchResults, getSearchResultsGrocery} = require("../controllers/searchController")

const router = express.Router();

router.get("/search", getSearchResults);
router.get("/search/grocery", getSearchResultsGrocery);

module.exports = router;
