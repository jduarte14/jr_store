const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dyw7aossa",
    api_key: "572679511956936",
    api_secret: "Zsf0uLPx7SuL86xhehSLGkdM1Qc"
});

module.exports = cloudinary;