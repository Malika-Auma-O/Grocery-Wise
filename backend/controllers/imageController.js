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
    const userId = req.user.userId;
    console.log(userId)
    // Use the parser middleware for handling image upload
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

    if (req.file) {
      req.body.image = req.file.path;
      req.body.imagePublicId = req.file.filename;
    }

    // Assuming you have a model called "Image" to save the uploaded image details
    let images = {
      image: req.body.image,
      userId: userId,
      publicId: req.body.imagePublicId,
    };
    // console.log(images)
    
    const newImage = await Image.create(images);

    res.send({ msg: "Image uploaded successfully", newImage });
  } catch (err) {
    res.status(500).send({ msg: "Failed to upload image", error: err });
  }
};



const getAllImages = async (req, res) => {
  try {
   
    // Use the Cloudinary API to list all resources (images)
    const result = await cloudinary.api.resources({ type: "upload", prefix: "demo/" });

    // Extract the URLs of all images from the result
    const images = result.resources.map((resource) => resource.url);

    // console.log("Retrieved images:");

    res.send(images);
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ error: "Failed to fetch images" });
  }
};


const getOneUserImage = async (req, res) => {
  try {
    const userId = req.user.userId; 
    // console.log(userId)
    const image = await Image.findOne({ userId }); // Fetch the image associated with the user

    if (!image) {
      // If the user does not have an image associated, you can send a placeholder image or return an empty response
      return res.status(404).send({ error: "Image not found" });
    }

    // Return the URL of the user's image
    res.send({ newImage: { image: image.image } });
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).send({ error: "Failed to fetch image" });
  }
};

const getAllUserImages = async (req, res) => {
  try {
    const userId = req.user.userId;
    const images = await Image.find({ userId }); // Fetch all images associated with the user

    if (!images || images.length === 0) {
      return res.status(404).send({ error: "Images not found for the user" });
    }

    res.send({ images: images.map((image) => image.image) });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send({ error: "Failed to fetch images" });
  }
};

const updateImage = async (req, res) => {
  try {
  const userId = req.user.userId;
  await Image.findOneAndUpdate({ userId }, { image: req.body.imageUrl })
  res.send("Image URL updated!");
  } catch (err) {
  console.error(err);
  res.status(500).send("Failed to update image URL");
  }
  }



module.exports = { uploadImage, getAllImages, getOneUserImage, getAllUserImages, updateImage };