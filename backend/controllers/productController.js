const Product = require("../Models/product");

const createProduct = async(req, res) =>{
  try {
    req.body.userId = req.user.userId;
    const newProduct = await Product.create(req.body)
    res.status(201).send({ msg: "Product created successfully", newProduct });
  } catch (error) {
    console.log("error creation", error)
    res.status(500).send({ msg: "Unable to create product", error });
  }
}

const getAllProducts = async(req, res) =>{
  try {
    const products = await Product.find();
    res.send(products)
  } catch (error) {
    res.status(500).send({ error: "An error occurred while getting products" });
  }
}

const updateProduct = async(req, res) =>{
  try {
    req.body.userId = req.user.userId;
    await Product.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.send({ msg: "Product updated successfully"});
  } catch (error) {
    res.status(500).send({ msg: "Unable to update product", error });
  }
}

const deleteProduct = async(req, res) =>{
  try {
    await Product.findByIdAndDelete({_id: req.params.id})
    res.send({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "An error occurred while deleting the product" });
  }
}

const getAllUserProducts = async(req, res) =>{
  try {
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
  getAllUserProducts
}