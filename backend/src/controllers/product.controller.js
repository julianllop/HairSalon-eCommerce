const {
    getProductsFromDB,
    getProductFromDB,
    deleteProductInDB,
    deleteProductsInDB,
    updateProductInDB,
    createProductInDB,
} = require("../functions/product.functions");

const getProducts = async (req, res) => {
    const { title } = req.query;

    try {
        const products = await getProductsFromDB();

        if (title) {
            const byName = products.filter((product) =>
                product.title.toLowerCase().includes(title.toLocaleLowerCase())
            );
            byName.length
                ? res.status(200).send(byName)
                : res.status(404).send("There is no product with that title");
        } else {
            res.status(201).json(products);
        }
    } catch (error) {
        res.status(400).json({
            message: "Error getting all products",
            error: error.message,
        });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await getProductFromDB(id);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({
            message: "Error getting product",
            error: error.message,
        });
    }
};

const createProduct = async (req, res) => {
    const { title, image, description, price, category } = req.body;

    try {
        const newProduct = await createProductInDB(
            title,
            image,
            description,
            price,
            category
        );

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({
            message: "Error at creating new product",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, image, description, price, category, isActive } = req.body;

    try {
        const updatedProduct = await updateProductInDB(
            id,
            title,
            image,
            description,
            price,
            category,
            isActive
        );
        res.status(201).json(updatedProduct);
    } catch (error) {
        res.status(400).json({
            message: "Error at updating product",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await deleteProductInDB(id);
        res.status(201).json(deletedProduct);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting product",
            error: error.message,
        });
    }
};
const deleteAll = async (req, res) => {
    try {
        const deletedProducts = await deleteProductsInDB();
        res.status(201).json(deletedProducts);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting products",
            error: error.message,
        });
    }
};

module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    deleteAll,
};
