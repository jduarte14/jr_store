const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true,
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    subcategory: {
        type: String,
        required: true
    },
    characteristic: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    image2: {
        type: String
    },
    image3: {
        type: String,
    },
    image4: {
        type: String,
    },
    image5: {
        type: String,
    }
});

module.exports = model('JProduct', ProductSchema, 'JProducts');
