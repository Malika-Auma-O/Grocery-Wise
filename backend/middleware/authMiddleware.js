require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  try {
    // Check if the authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).send({ msg: "Unauthorized access" });
    }

      // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Invalid token" });
    }

    // Verify the token using the private key
    const verifiedToken = jwt.verify(token, privateKey);
    if (!verifiedToken) {
      return res.send({msg: "Invalid Token"})
    } else {
      // If the token is valid, store the user information in req.user
      req.user = verifiedToken;

      // continue to the next middleware
      next();
    }
  } catch (error) {
    res.status(500).send({msg: "Error occurred:", error});
    console.log(error);
  }
}

module.exports = verifyToken;
