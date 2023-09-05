const router = require("express").Router();
const { getBazaarGroceryProduct,  getMyMGroceryProduct, getAllGroceryProducts, getProductByName, getProductCount, getSklavenitisGroceryProduct,getAllGroceryProductsConcurrently } = require("../controllers/groceryProductsController");

// For all products with default limit: GET /grocery/products
// For a custom limit (like 20 products): GET /grocery/products?limit=20
// For only Bazaar products: GET /grocery/products?source=Bazaar
// For only MyMarket products: GET /grocery/products?source=MyMarket

router.get("/fetch/bazaar", getBazaarGroceryProduct);
router.get("/fetch/market",  getMyMGroceryProduct);
router.get("/fetch/grocery",  getSklavenitisGroceryProduct);
router.get("/fetch/all",  getAllGroceryProductsConcurrently);
router.get("/grocery/products",  getAllGroceryProducts);
router.get("/grocery/products/search",  getProductByName);
router.get("/grocery/products/count",  getProductCount);

module.exports = router;