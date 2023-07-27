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

module.exports = { 
  productImageParser,
  userAvatarParser 
};