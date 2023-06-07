const validator = require('validator');
const Product = require('../models/Products');
const cloudinary = require('../cloudinary/cloudinary');

const createProduct = async (req, res) => {
    const params = req.body;
    const { nombre, descripcion, descripcionCorta, categoria  } = params;

    try {
        let validate_nombre = !validator.isEmpty(nombre);
        let validate_description = !validator.isEmpty(descripcion);
        let validate_descripcionCorta = !validator.isEmpty(descripcionCorta);
        let validate_categoria = !validator.isEmpty(categoria);

        if (!validate_nombre || !validate_description || !validate_descripcionCorta || !validate_categoria ) {
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
            nombre: nombre,
            descripcion: descripcion,
            descripcionCorta: descripcionCorta,
            categoria: categoria,
            caracteristicas: caracteristicas,
            imagen: imageUrls[0],
            imagen2: imageUrls[1],
            imagen3: imageUrls[2],
            imagen4: imageUrls[3],
            imagen5: imageUrls[4]
        });

        await product.save();

        return res.status(200).json({
            status: "success",
            message: "Product created successfully",
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
                status: "err or",
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
      const { nombre, descripcion, descripcionCorta, categoria, caracteristicas } = req.body;
      const id = req.params.id;
      const { imagen, imagen2, imagen3, imagen4, imagen5 } = req.files;
  
      const imageUrls = [];
  
      if (imagen) {
        const image = await cloudinary.uploader.upload(imagen[0].path);
        imageUrls.push(image.secure_url);
      }
      if (imagen2) {
        const image = await cloudinary.uploader.upload(imagen2[0].path);
        imageUrls.push(image.secure_url);
      }
      if (imagen3) {
        const image = await cloudinary.uploader.upload(imagen3[0].path);
        imageUrls.push(image.secure_url);
      }
      if (imagen4) {
        const image = await cloudinary.uploader.upload(imagen4[0].path);
        imageUrls.push(image.secure_url);
      }
      if (imagen5) {
        const image = await cloudinary.uploader.upload(imagen5[0].path);
        imageUrls.push(image.secure_url);
      }

  
      const productData = {
        nombre: nombre,
        descripcion: descripcion,
        descripcionCorta: descripcionCorta,
        categoria: categoria,
        caracteristicas: caracteristicas,
        imagen: imageUrls[0],
        imagen2: imageUrls[1],
        imagen3: imageUrls[2],
        imagen4: imageUrls[3],
        imagen5: imageUrls[4],
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
