const express = require("express");
const searchController = require("../controllers/searchController")

const router = express.Router();

router.get("/search", searchController.getSearchResults);

module.exports = router;
