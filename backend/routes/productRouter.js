const router = require("express").Router();
const {createProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct, getAllUserProducts, recentlyAdded} = require("../controllers/productController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/products", verifyToken, createProduct);
router.get("/products",  getAllProducts);
router.get("/products/:id", verifyToken, getOneProduct);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/user/products", verifyToken, getAllUserProducts);
router.get("/user/recently-added-products", recentlyAdded);

module.exports = router;