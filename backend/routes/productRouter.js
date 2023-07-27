const router = require("express").Router();
const {createProduct, getAllProducts, updateProduct, deleteProduct, getAllUserProducts} = require("../controllers/productController")
const verifyToken = require("../middleware/authMiddleware");

router.post("/products", verifyToken, createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);
router.get("/user/products", verifyToken, getAllUserProducts);

module.exports = router;