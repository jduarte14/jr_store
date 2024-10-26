const express = require("express");
const router = express.Router();
const multer = require('multer');
const ProductController = require('./../controllers/productController');

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
        if (file.fieldname !== 'image' && file.fieldname !== 'image2' && file.fieldname !== 'image3' && file.fieldname !== 'image4') {
            cb(null, false);
            return cb(new Error('Invalid field name'));
        }
        cb(null, true);
    }
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
]);

router.post('/products', upload, ProductController.createProduct);

router.patch('/products/:id', upload, ProductController.editProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
