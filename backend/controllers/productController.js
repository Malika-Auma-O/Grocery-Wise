const Product = require("../models/product");
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
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        price: req.body.price,
        image: req.body.image,
        imagePublicId : req.body.imagePublicId ,
        store: req.body.store,
        location: req.body.location,
        rating: req.body.rating,
      }

      const newProduct = await Product.create(product);
      res.status(201).send({ msg: "Product created successfully", newProduct });
    });
  } catch (error) {
    console.log("error creation", error);
    res.status(500).send({ msg: "Unable to create product", error });
  }
}


const updateProduct = async (req, res) => {
  try {
    // Set the user ID from the authentication token
    const userId = req.user.userId;

    // Check if the product exists
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).send({ msg: "Product not found" });
    }

    // Check if the user is the owner of the product
    if (existingProduct.userId !== userId) {
      return res.status(403).send({ msg: "You are not authorized to update this product" });
    }

    // Use the uploadProductImage middleware for handling image upload
    uploadProductImage(req, res, async (err) => {
      if (err) {
        return res.status(500).send({ msg: "Failed to upload product image", error: err });
      }

      // Update the product details with the new data
      existingProduct.name = req.body.name;
      existingProduct.description = req.body.description;
      existingProduct.category = req.body.category;
      existingProduct.brand = req.body.brand;
      existingProduct.price = req.body.price;
      existingProduct.store = req.body.store;
      existingProduct.location = req.body.location;
      existingProduct.rating = req.body.rating;

      // if a new image is uploaded, save the Cloudinary image URL and public ID to the product
      if (req.file) {
        existingProduct.image = req.file.path;
        existingProduct.imagePublicId = req.file.filename;
      }

      // Save the updated product to the database
      await existingProduct.save();

      res.send({ msg: "Product updated successfully", updatedProduct: existingProduct });
    });
  } catch (error) {
    console.log("error updating", error);
    res.status(500).send({ msg: "Unable to update product", error });
  }
};



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

const getOneProduct = async(req, res) =>{
  try {

    // Fetch product from the database
    const product = await Product.findById({_id: req.params.id});
    
    // check for product, and send the product as a response
    if (!product) {
      res.status(404).send({ errorCode: 404, message: "Product not found" });
      return;
    }
    res.status(200).send(product); 
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting products" });
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
  getOneProduct,
  updateProduct,
  deleteProduct,
  getAllUserProducts,
}