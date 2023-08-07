const Product = require("../models/product");

const getSearchResults = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required." });
  }

  try {
    const results = await Product.find({
      name: { $regex: new RegExp(query, "i") },
    });

    // const results = await Product.find({
    //   $or: [
    //     {name: { $regex: new RegExp(query, "i") }},   
    //     { name: { $regex: new RegExp(nameQuery, "i") } }, 
    //     { brand: { $regex: new RegExp(brandQuery, "i") } },   
    //     { location: { $regex: new RegExp(locationQuery, "i") } }  
    //   ]
    // })

    res.json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports ={
    getSearchResults,
}