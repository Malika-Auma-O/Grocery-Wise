const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const express = require("express");
const Image = require("../models/image");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "demo",
    format: async (req, file) => "jpg", // supports promises as well
    public_id: (req, file) => `avatar-${Date.now()}`
  }
});

const parser = multer({ storage: storage });

const uploadImage = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      parser.single("image")(req, res, (err) => {
        if (err) {
          console.error("Error uploading", err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.send(req.file);
  } catch (err) {
    res.status(400).send({ error: "Failed to upload image" });
  }
};

const getImage = async (req, res) => {
  try {
    // Use the Cloudinary API to list all resources (images)
    const result = await cloudinary.api.resources({ type: "upload", prefix: "demo/" });

    // Extract the URLs of all images from the result
    const images = result.resources.map((resource) => resource.url);

    console.log("Retrieved images:", images);

    res.send(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ error: "Failed to fetch images" });
  }
};

module.exports = { uploadImage, getImage };