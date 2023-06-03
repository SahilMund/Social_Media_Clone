const cloudinary = require("cloudinary").v2;
const env = require('./environment');

cloudinary.config({
    cloud_name: env.cloudinary_cloud_name,
    api_key: env.cloudinary_api_key,
    api_secret: env.cloudinary_api_secret
  });

module.exports = cloudinary;