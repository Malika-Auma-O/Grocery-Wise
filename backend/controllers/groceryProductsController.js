const Product = require("../models/groceryProduct");
const { uploadImageFromBazaarUrl, uploadImageFromMyMUrl, uploadImageFromSklavenitisUrl  } = require("../middleware/uploadMiddleware");
const { getAllBazaarPages } = require("../groceryFetch/BazaarFetch");
const { getAllMyMPages } = require("../groceryFetch/MyMarketFetch");
const { getAllSklavenitisPages } = require("../groceryFetch/SklavenitisFetch");
const stringSimilarity = require('string-similarity');

const getBazaarGroceryProduct = async () => {
    const productsToInsert = [];
  
    try {
        // Fetch all products from the BazaarFetch
        const fetchedProducts = await getAllBazaarPages();
  
        // Fetch existing product IDs to avoid duplicates
        const existingProductIds = await Product.find().distinct('_id');
  
        // Iterate over each product
        for (let product of fetchedProducts) {
            // Skip if product already exists
            if (!existingProductIds.includes(product._id)) {
                // Upload image to Cloudinary if available
                if (product.imgSrc) {
                    try {
                        const fullImageUrl = product.imgSrc.startsWith("//") 
                            ? "https:" + product.imgSrc 
                            : product.imgSrc;
                        product.imgSrc = await uploadImageFromBazaarUrl(fullImageUrl);
                    } catch (imgError) {
                        console.log("Failed to upload image for product:", product._id, imgError);
                    }
                }
                productsToInsert.push(product);
            }
        }
  
        // Insert new products to the database
        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
        }
  
        // Return the newly added products
        return productsToInsert;
    } catch (error) {
        console.log('Error during Bazaar product insertion:', error);
        throw error;
    }
  };
  
  const getMyMGroceryProduct = async () => {
    const productsToInsert = [];
  
    try {
        // Fetch all products from the MyMarket
        const fetchedProducts = await getAllMyMPages();
  
        // Fetch existing product IDs to avoid duplicates
        const existingProductIds = await Product.find().distinct('_id');
  
        // Iterate over each product
        for (let product of fetchedProducts) {
            // Skip if product already exists
            if (!existingProductIds.includes(product._id)) {
                // Upload image to Cloudinary if available
                if (product.imgSrc) {
                    try {
                        const fullImageUrl = product.imgSrc.startsWith("//") 
                            ? "https:" + product.imgSrc 
                            : product.imgSrc;
                        product.imgSrc = await uploadImageFromMyMUrl(fullImageUrl);
                    } catch (imgError) {
                        console.log("Failed to upload image for product:", product._id, imgError);
                    }
                }
                productsToInsert.push(product);
            }
        }
  
        // Insert new products to the database
        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
        }
  
        // Return the newly added products
        return productsToInsert;
    } catch (error) {
        console.log('Error during MyMarket product insertion:', error);
        throw error;
    }
  };
  
  const getSklavenitisGroceryProduct = async () => {
    const productsToInsert = [];
  
    try {
        // Fetch all products from the SklavenitisFetch
        const fetchedProducts = await getAllSklavenitisPages();
  
        // Fetch existing product IDs to avoid duplicates
        const existingProductIds = await Product.find().distinct('_id');
  
        // Iterate over each product
        for (let product of fetchedProducts) {
            // Skip if product already exists
            if (!existingProductIds.includes(product._id)) {
                // Upload image to Cloudinary if available
                if (product.imgSrc) {
                    try {
                        const fullImageUrl = product.imgSrc.startsWith("//") 
                            ? "https:" + product.imgSrc 
                            : product.imgSrc;
                        product.imgSrc = await uploadImageFromSklavenitisUrl(fullImageUrl);
                    } catch (imgError) {
                        console.log("Failed to upload image for product:", product._id, imgError);
                    }
                }
                productsToInsert.push(product);
            }
        }
  
        // Insert new products to the database
        if (productsToInsert.length > 0) {
            await Product.insertMany(productsToInsert);
        }
  
        // Return the newly added products
        return productsToInsert;
    } catch (error) {
        console.log('Error during Sklavenitis product insertion:', error);
        throw error;
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
        console.log('Error during fetching products:', error);
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
        const similarityThreshold = 0.4;
        const similarProducts = allProducts.filter(product => {
            const similarity = stringSimilarity.compareTwoStrings(productName, product.title);
            return similarity >= similarityThreshold;
        });

        res.json(similarProducts);
    } catch (error) {
        console.log('Error during fetching products by name:', error);
        res.status(500).json({ error: 'Failed to fetch products by name' });
    }
};


const getProductCount = async (req, res) => {
    try {
        const source = req.query.source;

        let query = Product.find();

        // Filter by source if specified
        if (source) {
            query = query.where('source', source);
        }

        const count = await query.countDocuments();
        res.json({ count });
    } catch (error) {
        console.log('Error during counting products:', error);
        res.status(500).json({ error: 'Failed to count products' });
    }
};



const getAllGroceryProductsConcurrently = async (req, res) => {
    try {
        // Start all three scrapers concurrently
        const [bazaarProducts, myMProducts, sklavenitisProducts] = await Promise.all([
            getBazaarGroceryProduct(),
            getMyMGroceryProduct(),
            getSklavenitisGroceryProduct()
        ]);
        
        // Merge results
        const allProducts = [...bazaarProducts, ...myMProducts, ...sklavenitisProducts];
        
        res.json(allProducts);
    } catch (error) {
        console.log('Error during concurrent product fetching:', error);
        res.status(500).json({ error: 'Failed to fetch products concurrently' });
    }
};




module.exports = {
    getBazaarGroceryProduct,
    getMyMGroceryProduct,
    getAllGroceryProducts,
    getProductByName,
    getProductCount,
    getSklavenitisGroceryProduct,
    getAllGroceryProductsConcurrently
}