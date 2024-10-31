const express = require("express");
const router = express.Router();
const multer = require('multer');
const ArticleController = require('./../controllers/articleController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.fieldname.startsWith("banner")) {
            cb(null, false);
            return cb(new Error('Invalid field name'));
        }
        cb(null, true);
    }
}).fields([
    { name: 'banner', maxCount: 1 },
]);


router.post('/articles', upload, ArticleController.createArticle);
router.get('/articles', ArticleController.getArticles);
router.get('/articles/:id', ArticleController.getArticle);
router.delete('/articles/:id', ArticleController.deleteArticle);
router.patch('/articles/:id',upload, ArticleController.editArticle);

module.exports = router;
