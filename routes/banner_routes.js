const express = require("express");
const router = express.Router();
const multer = require('multer');
const BannerController = require('./../controllers/bannerController');

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
        if (file.fieldname !== 'desktop_image' && file.fieldname !== 'mobile_image' ) {
            cb(null, false);
            return cb(new Error('Invalid field name'));
        }
        cb(null, true);
    }
}).fields([
    { name: 'desktop_image', maxCount: 1 },
    { name: 'mobile_image', maxCount: 1 },
]);

router.post('/banners', upload, BannerController.createBanner);
router.get('/banners', BannerController.getBanners);
router.get('/banners/:id', BannerController.getBanner);
router.delete('/banners/:id', BannerController.deleteBanner);
router.patch('/banners/:id',upload, BannerController.editBanner);

module.exports = router;
