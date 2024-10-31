const { Schema, model } = require('mongoose');

const ArticleSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    characteristics: {
        type: String
    },
    content: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
    }
});

module.exports = model('JArticle', ArticleSchema, 'JArticle');
