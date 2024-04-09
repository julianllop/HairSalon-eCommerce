const { Router } = require("express");
const {
    getProducts,
    getProduct,
    updateProduct,
    createProduct,
    deleteProduct,
    deleteAll,
} = require("../controllers/product.controller");

const productRouter = Router();

productRouter.get("/", getProducts);

productRouter.get("/:id", getProduct);

productRouter.post("/", createProduct);

productRouter.put("/:id", updateProduct);

productRouter.delete("/", deleteAll);

productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
