const router = require("express").Router();
const { getBazaarGroceryProduct,  getMyMGroceryProduct, getAllGroceryProducts, getProductByName} = require("../controllers/groceryProductsController");

// For all products with default limit: GET /grocery/products
// For a custom limit (like 20 products): GET /grocery/products?limit=20
// For only Bazaar products: GET /grocery/products?source=Bazaar
// For only MyMarket products: GET /grocery/products?source=MyMarket

router.get("/bazaar/fetch", getBazaarGroceryProduct);
router.get("/bazaar/grocery",  getMyMGroceryProduct);
router.get("/grocery/products",  getAllGroceryProducts);
router.get("/grocery/products/search",  getProductByName);

module.exports = router;