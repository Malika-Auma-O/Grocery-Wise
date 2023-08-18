const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const BASE_URL = process.env.BAZAAR_URL;
const MAX_PAGES = 73;
const DELAY_MS = 5000;

exports.getAllBazaarPages = async () => {
    let allProducts = [];
    for (let i = 1; i <= MAX_PAGES; i++) {
        const pageProducts = await getGroceryProduct(i);
        allProducts = allProducts.concat(pageProducts);
        if (i !== MAX_PAGES) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    return allProducts;
};

const getGroceryProduct = async (pageNumber) => {
    try {
        const pageURL = pageNumber === 1 ? BASE_URL : `${BASE_URL}p${pageNumber}/`;
        const { data } = await axios.get(pageURL);
        const $ = cheerio.load(data);
        const products = [];
        $('article.x-control.x-box.x-product-box').each((index, element) => {
            const product = {
                title: $(element).find('h2.heading a').attr('title'),
                link: $(element).find('h2.heading a').attr('href'),
                imgSrc: $(element).find('figure.image-container img').attr('data-src'),
                brand: $(element).find('h3.brand').text().trim(),
                price: $(element).find('.current-price-container .current-price').text().trim(),
                code: $(element).find('.code-container span').last().text().trim(),
                reducedPrice: $(element).find('.reduced-price span').text().trim(),
                deletedPrice: $(element).find('.deleted-price').text().trim(),
                source: "Bazaar" 
            };
            products.push(product);
        });
        return products;
    } catch (error) {
        console.error(`Error fetching page ${pageNumber}:`, error);
        throw error;
    }
};
