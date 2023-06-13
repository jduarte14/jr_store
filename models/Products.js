const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    descripcionCorta: {
        type: String,
        required: true
    },
    categoriaPadre:{
        type:String,
        required:true
    },
    categoria: {
        type: String,
        required: true
    },
    caracteristicas: {
        type: String
    },
    imagen: {
        type: String,
        required: true
    },
    imagen2: {
        type: String
    },
    imagen3: {
        type: String,
    }
});

module.exports = model('Product', ProductSchema, 'products');
