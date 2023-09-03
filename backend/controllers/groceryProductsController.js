const Product = require("../models/groceryProduct");
const { uploadImageFromBazaarUrl, uploadImageFromMyMUrl  } = require("../middleware/uploadMiddleware");
const { getAllBazaarPages } = require("../groceryFetch/BazaarFetch");
const { getAllMyMPages } = require("../groceryFetch/MyMarketFetch");
const stringSimilarity = require('string-similarity');

const getBazaarGroceryProduct = async (req, res) => {
    try {
        // Fetch all products from the BazaarFetch
        const fetchedProducts = await getAllBazaarPages();

        // Fetch existing product IDs to avoid duplicates
        const existingProductIds = await Product.find().distinct('_id');
        const productsToInsert = [];

        // Iterate over each product
        for (let product of fetchedProducts) {
            // Skip if product already exists
            if (!existingProductIds.includes(product._id)) {
                // Upload image to Cloudinary if available
                if (product.imgSrc) {
                    try {
                        // Handle image URLs starting with "//"
                        const fullImageUrl = product.imgSrc.startsWith("//") 
                            ? "https:" + product.imgSrc 
                            : product.imgSrc;

                        product.imgSrc = await uploadImageFromBazaarUrl(fullImageUrl);
                    } catch (imgError) {
                        console.error("Failed to upload image for product:", product._id, imgError);
                        
                        // Continue and add product without the image if no image
                    }
                }
                productsToInsert.push(product);
            }
        }

        // Insert new products to the database
        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
        }

        // Respond with the newly added products
        res.json(productsToInsert);
    } catch (error) {
        console.error('Error during product insertion:', error);
        res.status(500).json({ error: 'Failed to get products' });
    }
};

const getMyMGroceryProduct = async (req, res) => {
    try {
        // Fetch all products from the MyMarket
        const fetchedProducts = await getAllMyMPages();

        // Fetch existing product IDs to avoid duplicates
        const existingProductIds = await Product.find().distinct('_id');
        const productsToInsert = [];

        // Iterate over each product
        for (let product of fetchedProducts) {
            // Skip if product already exists
            if (!existingProductIds.includes(product._id)) {
                // Upload image to Cloudinary if available
                if (product.imgSrc) {
                    try {
                        // Handle image URLs starting with "//"
                        const fullImageUrl = product.imgSrc.startsWith("//") 
                            ? "https:" + product.imgSrc 
                            : product.imgSrc;

                        product.imgSrc = await uploadImageFromMyMUrl(fullImageUrl);
                    } catch (imgError) {
                        console.error("Failed to upload image for product:", product._id, imgError);
                        
                        // Continue and add product without the image if no image
                    }
                }
                productsToInsert.push(product);
            }
        }

        // Insert new products to the database
        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
        }

        // Respond with the newly added products
        res.json(productsToInsert);
    } catch (error) {
        console.error('Error during product insertion:', error);
        res.status(500).json({ error: 'Failed to get products' });
    }
};



const getAllGroceryProducts = async (req, res) => {
    try {
        // 'Bazaar', 'MyMarket', or undefined for all
        const source = req.query.source; 
         // allows custom limit, default is 10
        const limit = parseInt(req.query.limit) || 10;
        const cursor = req.query.cursor;

        let query = Product.find();

        // Filter by source if specified
        if (source) {
            query = query.where('source', source);
        }

        // Apply cursor-based pagination if a cursor is provided
        if (cursor) {
            query = query.where('_id').gt(cursor);
        }

        const products = await query.limit(limit).exec();
        res.json(products);
    } catch (error) {
        console.error('Error during fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductByName = async (req, res) => {
    try {
        const productName = req.query.name;

        // If no name provided, return an error or empty array
        if (!productName) {
            return res.status(400).json({ error: 'No product name provided.' });
        }

        // Fetch all products (this may not be efficient for a very large dataset)
        const allProducts = await Product.find();
        
        // Calculate similarity for each product and filter those that are sufficiently similar
        const similarityThreshold = 0.7;
        const similarProducts = allProducts.filter(product => {
            const similarity = stringSimilarity.compareTwoStrings(productName, product.title);
            return similarity >= similarityThreshold;
        });

        res.json(similarProducts);
    } catch (error) {
        console.error('Error during fetching products by name:', error);
        res.status(500).json({ error: 'Failed to fetch products by name' });
    }
};







module.exports = {
    getBazaarGroceryProduct,
    getMyMGroceryProduct,
    getAllGroceryProducts,
    getProductByName
}