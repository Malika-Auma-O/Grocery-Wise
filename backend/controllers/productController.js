const Product = require("../Models/product");
const { productImageParser } = require("../middleware/uploadMiddleware");

// Use the productImageParser middleware for uploading product images
const uploadProductImage = productImageParser.single("image");

const createProduct = async (req, res) => {
  try {
    // Set the user ID from the authentication token
    const userId = req.user.userId;

    // Use the uploadProductImage middleware for handling image upload
    uploadProductImage(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ msg: "Failed to upload product image", error: err });
      }

      // if a new image is uploaded save the Cloudinary image URL to the product
      if (req.file) {
        req.body.image = req.file.path;
        req.body.imagePublicId = req.file.filename;
      }

      // Create a new product in the database and response
      let product = {
        userId: req.user.userId,
        description: req.user.description,
        name: req.body.name,
        image: req.body.image, price:
        req.body.price
      }

      const newProduct = await Product.create(product);
      res.status(201).send({ msg: "Product created successfully", newProduct });
    });
  } catch (error) {
    console.log("error creation", error);
    res.status(500).send({ msg: "Unable to create product", error });
  }
}

const getAllProducts = async(req, res) =>{
  try {

    // Fetch all products from the database
    const products = await Product.find();

    // Send the list of products as a response
    res.send(products)
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting products" });
  }
}

const updateProduct = async(req, res) =>{
  try {

    // Set the user ID from the authentication token
    req.body.userId = req.user.userId;

    // if a new image uploaded save the Cloudinary image URL an ID to the product
    if (req.file) {
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename; 
    }

    // Find the product by ID
    const product = await Product.findById(req.params.id);

    // Check if the authenticated user owns the product
    if (product.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to update this product" });
    }

     // Find by ID and update only the specified fields using $set
    await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //true returns the updated product object
    );
    res.status(200).send({ msg: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).send({ msg: "Unable to update product", error });
  }
}

const deleteProduct = async(req, res) =>{
  try {

    // Find the product by ID
    const product = await Product.findById(req.params.id);
    
    // Check if the authenticated user owns the product
    if (product.userId !== req.user.userId) {
      return res.status(403).send({ msg: "Unauthorized to delete this product" });
    }

    // Find the product by ID and delete it
    await Product.findByIdAndDelete({_id: req.params.id})
    res.send({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the product" });
  }
}

// get all products associated with a specific user
const getAllUserProducts = async(req, res) =>{
  try {
    // Find all products of a user based on their user ID
    const userProducts = await Product.find({ userId: req.user.userId })
    res.send(userProducts)
  } catch (error) {
    res.status(401).send({ msg:"Unauthorized access", error})
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllUserProducts,
}