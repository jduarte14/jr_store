const Article = require('../models/Article');
const cloudinary = require('../cloudinary/cloudinary');

const createArticle = async (req, res) => {
    try {
        const { title, category, description, content } = req.body;
        const imageUrls = await Promise.all(
            Object.values(req.files).map(async (file) => {
                const image = await cloudinary.uploader.upload(file[0].path);
                return image.secure_url;
            })
        );

        if (title || category || description || content) {
            const newArticle = new Article({
                title: title,
                category: category,
                description: description,
                content: content,
                banner: imageUrls[0]  // Assuming the first image URL is used as the banner
            });

            await newArticle.save();
            return res.status(200).json({
                status: "success",
                message: "The article was successfully created",
                article: newArticle,
            });
        } else if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Missing required image",
            });
        } else {
            return res.status(404).json({
                status: "error",
                message: "There was a required field empty",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const getArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        if (!articles) {
            return res.status(400).json({
                status: "error",
                message: "There are no articles created",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "These are the current articles stored:",
            articles: articles,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const getArticle = async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({
                status: "error",
                error: 'The ID does not exist'
            });
        }

        return res.status(200).json({
            status: "success",
            message: "The article was found",
            article: article,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findByIdAndDelete(id);
        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Article not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Article deleted successfully",
            article_deleted: article,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const editArticle = async (req, res) => {
    try {
        const { title, category, description, content } = req.body;
        const id = req.params.id;

        const imageUrls = await Promise.all(
            Object.values(req.files).map(async (file) => {
                const image = await cloudinary.uploader.upload(file[0].path);
                return image.secure_url;
            })
        );

        const articleData = {
            title: title,
            category: category,
            description: description,
            content: content,
            banner: imageUrls[0] 
        };

        const article = await Article.findByIdAndUpdate(id, articleData, { new: true });

        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Article not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Article updated successfully",
            article_modified: article,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    createArticle,
    getArticles,
    getArticle,
    deleteArticle,
    editArticle,
};
