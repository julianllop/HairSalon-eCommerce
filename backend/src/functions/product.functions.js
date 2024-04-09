require("dotenv").config();
const { Product } = require("../db");

const getProductsFromDB = async () => {
    const products = await Product.findAll();
    return products;
};

const getProductFromDB = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) return null;

    return product;
};

const createProductInDB = async (
    title,
    image,
    description,
    price,
    category
) => {
    const newProduct = await Product.create({
        title,
        image,
        description,
        price,
        category,
    });

    return newProduct;
};

const updateProductInDB = async (
    id,
    title,
    image,
    description,
    price,
    category,
    isActive
) => {
    const updatedProduct = await Product.findByPk(id);

    if (!updatedProduct) throw Error("Product not found!");

    updatedProduct.title = title;
    updatedProduct.image = image;
    updatedProduct.description = description;
    updatedProduct.price = price;
    updatedProduct.category = category;
    updatedProduct.isActive = isActive;

    await updatedProduct.save();

    return updatedProduct;
};

const deleteProductInDB = async (id) => {
    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.destroy();
};

const deleteProductsInDB = async () => {
    const deletedProducts = await Product.destroy({
        where: {},
        truncate: true,
    });

    return deletedProducts;
};

module.exports = {
    getProductsFromDB,
    getProductFromDB,
    deleteProductInDB,
    deleteProductsInDB,
    updateProductInDB,
    createProductInDB,
};
