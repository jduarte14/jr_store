const Banner = require('./../models/Banners');
const cloudinary = require('../cloudinary/cloudinary');

const createBanner = async (req, res) => {
    try {
        const { name, type, title, subtitle, description, link, desktop_image, mobile_image } = req.body;
        const imageUrls = await Promise.all(
            Object.values(req.files).map(async (file) => {
                const image = await cloudinary.uploader.upload(file[0].path);
                return image.secure_url;
            })
        );

        if (name || type || title || description || desktop_image || mobile_image) {
            const newBanner = new Banner({
                name: name,
                type: type,
                title: title,
                subtitle:subtitle,
                description: description,
                link: link,
                desktop_image: imageUrls[0],
                mobile_image: imageUrls[1]
            });

            await newBanner.save();
            return res.status(200).json({
                status: "success",
                message: "the banner was succesfully created",
                banner: newBanner,
            })
        }
        else if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Missing required image",
            });
        }
        else {
            return res.status(404).json({
                status: "error",
                message: "There was a required field empty",
            })
        }


    }
    catch (error) {
        return res.status(500).json({
            error: error.message,
        })
    }
}

const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        if (!banners) {
            return res.status(400).json({
                status: "error",
                message: "There was no banners created",
            })
        }
        return res.status(200).json({
            status: "success",
            message: "These are the current banners stored:",
            banners: banners,
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}


const getBanner = async (req, res) => {
    try {
        let id = req.params.id;
        const banner = await Banner.findById(id);
        if (!banner) {
            return res.status(404).json({
                status: "error",
                error: 'the id does not exist'
            })
        }

        return res.status(202).json({
            status: "success",
            message: "The banner was found",
            banner: banner,
        })
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        })
    }
}

const deleteBanner = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            return res.status(404).json({
                status: "error",
                message: "Banner not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Banner deleted successfully",
            banner_deleted: banner,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


const editBanner = async (req, res) => {
    try {
        const { name, type, title, description, link, desktop_image, mobile_image, subtitle } = req.body;
        const id = req.params.id;

        const imageUrls = await Promise.all(
            Object.values(req.files).map(async (file) => {
                const image = await cloudinary.uploader.upload(file[0].path);
                return image.secure_url;
            })
        );
        const productData = {
            name: name,
            type: type,
            title: title,
            subtitle:subtitle,
            description: description,
            link: link,
            desktop_image: imageUrls[0],
            mobile_image: imageUrls[1]
        };

        const banner = await Banner.findByIdAndUpdate(id, productData, { new: true });

        if (!banner) {
            return res.status(404).json({
                status: "error",
                message: "Banner not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Banner updated successfully",
            banner_modified: banner,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    createBanner,
    getBanners,
    getBanner,
    deleteBanner,
    editBanner,
}