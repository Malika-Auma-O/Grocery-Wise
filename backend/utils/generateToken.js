require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.PRIVATE_KEY;

//generate a new jwt token
// const generateToken = (payload, expiresIn) => {
//   return jwt.sign(payload, privateKey, { expiresIn });
// };
const generateToken = (payload) => {
  return jwt.sign(payload, privateKey);
};

module.exports = generateToken;