const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv").config();
const BASE_URL = process.env.SKLAVENITIS_URL;
const MAX_PAGES = 92;
const DELAY_MS = 5000;

exports.getAllSklavenitisPages = async () => {
    let allProducts = [];
    for (let i = 1; i <= MAX_PAGES; i++) {
        const pageProducts = await getSklavenitisProduct(i);
        allProducts = allProducts.concat(pageProducts);
        if (i !== MAX_PAGES) {
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        }
    }
    return allProducts;
};

const getSklavenitisProduct = async (pageNumber) => {
    try {
        const pageURL = pageNumber === 1 ? BASE_URL : `${BASE_URL}?pg=${pageNumber}`;
        const { data } = await axios.get(pageURL);
        const $ = cheerio.load(data);
        const products = [];
        
        $('.product_innerTop').each((index, element) => {
            const product = {
                title: $(element).find('h4.product__title a').text().trim(),
                link: $(element).find('h4.product__title a').attr('href'),
                imgSrc: $(element).find('figure.product__figure a img').attr('src'),
                deletedMeasurementPrice: $(element).parent().find('.priceKil .deleted .deleted__price').text().trim(),
                highlightMeasurementPrice: $(element).parent().find('.priceKil .hightlight').text().trim(),
                deletedUnitPrice: $(element).parent().find('.main-price .deleted .deleted__price').text().trim(),
                unitPrice: $(element).parent().find('.main-price .price').text().trim(),
                source: "Sklavenitis" 
            };
            products.push(product);
        });
        
        return products;
    } catch (error) {
        console.error(`Error fetching page ${pageNumber}:`, error);
        throw error;
    }
};
