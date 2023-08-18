const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const BASE_URL = process.env.MYM_URL;
const MAX_PAGES = 51;
const DELAY_MS = 5000;

exports.getAllMyMPages = async () => {
    let allProducts = [];
    for (let i = 1; i <= MAX_PAGES; i++) {
        const pageProducts = await getMyMGroceryProduct(i);
        allProducts = allProducts.concat(pageProducts);
        if (i !== MAX_PAGES) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    return allProducts;
};

const getMyMGroceryProduct = async (pageNumber) => {
    try {
        const pageURL = pageNumber === 1 ? BASE_URL : `${BASE_URL}?page=${pageNumber}`;
        const { data } = await axios.get(pageURL);
        const $ = cheerio.load(data);
        const products = [];
        
        $('article.product--teaser').each((index, element) => {
            const product = {
                title: $(element).find('h3 a').text().trim(),
                link: $(element).find('h3 a').attr('href'),
                imgSrc: $(element).find('div.teaser-image-container picture img').attr('src'),
                finalMeasurementPrice: $(element).find('.measurment-unit-row .measure-label-wrapper:nth-child(1) .font-bold').text().trim(),
                originalMeasurementPrice: $(element).find('.measurment-unit-row .measure-label-wrapper:nth-child(2) .font-bold.line-through').text().trim(),
                sellingPrice: $(element).find('.selling-unit-row .price').text().trim(),
                listPrice: $(element).find('.selling-unit-row .list-price').text().trim(),
                source: "MyMarket" 
            };
            products.push(product);
        });
        
        return products;
    } catch (error) {
        console.error(`Error fetching page ${pageNumber}:`, error);
        throw error;
    }
};
