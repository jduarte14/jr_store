const { Schema, model } = require('mongoose');

const BannerSchema = Schema({
    name:{
        type:String,
        required: true,
    },
    type:{
        type:String,
         required: true,
    },
    title:{
        type:String,
        required: true,
    },
    subtitle:{
        type:String
    },
    description:{
        type:String,
       required: true,
    },
    link:{
        type:String,
    },
    link_text:{
        type:String,
    },
    desktop_image:{
        type:String,
    },
    mobile_image:{
        type:String,
    }
});

module.exports = model('banner', BannerSchema, 'banners');
