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
        if (file.fieldname !== 'imagen' && file.fieldname !== 'imagen2' && file.fieldname !== 'imagen3' && file.fieldname !== 'imagen4' && file.fieldname !== 'imagen5' && file.fieldname !== 'imagen6' && file.fieldname !== 'imagen7') {
            cb(null, false);
            return cb(new Error('Invalid field name'));
        }
        cb(null, true);
    }
}).fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'imagen2', maxCount: 1 },
    { name: 'imagen3', maxCount: 1 },
    { name: 'imagen4', maxCount: 1 },
    { name: 'imagen5', maxCount: 1 },
]);

router.post('/products', upload, ProductController.createProduct);

router.put('/products/:id', upload, ProductController.editProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
