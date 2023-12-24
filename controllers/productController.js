const Product = require('../models/Products');
const cloudinary = require('../cloudinary/cloudinary');

const createProduct = async (req, res) => {
    const params = req.body;
    const { name, description, category, subcategory, characteristic, price } = params;

    try {


        if (!name || !description || !category) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields",
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                status: "error",
                message: "Missing required image",
            });
        }

        const imageUrls = await Promise.all(
            Object.values(req.files).map(async (file) => {
                const image = await cloudinary.uploader.upload(file[0].path);
                return image.secure_url;
            })
        );

        const product = new Product({
            name: name,
            description: description,
            category: category,
            subcategory: subcategory,
            characteristic: characteristic,
            price: price,
            image: imageUrls[0],
            image2: imageUrls[1],
            image3: imageUrls[2],
            image4: imageUrls[3],
            image5: imageUrls[4]
        });
        await product.save();

        return res.status(200).json({
            status: "success",
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(400).json({
                status: "error",
                message: "No products found in the database",
            })
        }
        return res.status(200).json({
            status: "success",
            products: products,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const getProduct = async (req, res) => {
    try {
        let id = req.params.id;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(400).json({
                status: "error",
                error: `${productId} does not exist`
            });
        }

        return res.status(200).json({
            status: "success",
            product: product
        });

    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            error: error.message
        });
    }

}

const editProduct = async (req, res) => {
try {
        const params = req.body;
        const { name, description, category, subcategory, characteristic, price } = params;
        const id = req.params.id;
        const { image, image2, image3, image4, image5 } = req.files;

        const imageUrls = [];

        if (image) {
            const imageData = await cloudinary.uploader.upload(image[0].path);
            imageUrls.push(imageData.secure_url);
        }
        if (image2) {
            const imageData = await cloudinary.uploader.upload(image2[0].path);
            imageUrls.push(imageData.secure_url);
        }
        if (image3) {
            const imageData = await cloudinary.uploader.upload(image3[0].path);
            imageUrls.push(imageData.secure_url);
        }
        if (image4) {
            const imageData = await cloudinary.uploader.upload(image4[0].path);
            imageUrls.push(imageData.secure_url);
        }
        if (image5) {
            const imageData = await cloudinary.uploader.upload(image5[0].path);
            imageUrls.push(imageData.secure_url);
        }

        const productData = {
            name: name,
            description: description,
            category: category,
            subcategory: subcategory,
            characteristic: characteristic,
            price: price,
            image: imageUrls[0],
            image2: imageUrls[1],
            image3: imageUrls[2],
            image4: imageUrls[3],
            image5: imageUrls[4]
        };

        const product = await Product.findByIdAndUpdate(id, productData, { new: true });

        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({
                status: "error",
                message: "Product not found",
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Product deleted successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    editProduct,
    deleteProduct
};
