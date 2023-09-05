const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage object for product images
const productImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product-images", 
    format: async (req, file) => "jpeg",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    public_id: (req, file) => `avatar-${Date.now()}`
  },
});

// Create a storage object for user avatars
const userAvatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user-avatars",
    format: async (req, file) => "jpeg",
    transformation: [{ width: 200, height: 200, crop: "thumb" }],
    public_id: (req, file) => `avatar-${Date.now()}`,
  },
});



// Create a multer object for product and avatar uploads
const productImageParser = multer({ storage: productImageStorage });
const userAvatarParser = multer({ storage: userAvatarStorage });

// Function to upload image from URL
const uploadImageFromBazaarUrl = async (url, source = 'default') => {
  try {
    const response = await cloudinary.uploader.upload(url, {
      folder: `bazaar-images/`,
      transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    return response.secure_url;
  } catch (error) {
    console.error("Failed to upload image to Cloudinary", error);
    throw error;
  }
};

const uploadImageFromMyMUrl = async (url, source = 'default') => {
  try {
    const response = await cloudinary.uploader.upload(url, {
      folder: `mymarket-images/`,
      transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    return response.secure_url;
  } catch (error) {
    console.error("Failed to upload image to Cloudinary", error);
    throw error;
  }
};

const uploadImageFromSklavenitisUrl = async (url, source = 'default') => {
  try {
    const response = await cloudinary.uploader.upload(url, {
      folder: `sklavenitis-images/`,
      transformation: [{ width: 500, height: 500, crop: "limit" }]
    });
    return response.secure_url;
  } catch (error) {
    console.error("Failed to upload image to Cloudinary", error);
    throw error;
  }
};


module.exports = { 
  productImageParser,
  userAvatarParser,
  uploadImageFromBazaarUrl,
  uploadImageFromMyMUrl,
  uploadImageFromSklavenitisUrl
};