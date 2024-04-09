const { Router } = require("express");
const {
    getShoppingCart,
    getShoppingCartQuantity,
    addToCart,
    removeFromCart,
    updateCart,
    clearCart,
    checkoutAll,
    webhook,
} = require("../controllers/shoppingCart.controller");

const shoppingCartRouter = Router();

shoppingCartRouter.get("/:userId", getShoppingCart);

shoppingCartRouter.get("/quantity/:userId", getShoppingCartQuantity);

shoppingCartRouter.post("/add", addToCart);

shoppingCartRouter.post("/remove", removeFromCart);

shoppingCartRouter.put("/", updateCart);

shoppingCartRouter.delete("/:userId", clearCart);

shoppingCartRouter.post("/checkoutAll", checkoutAll);

shoppingCartRouter.post("/webhook", webhook);

module.exports = shoppingCartRouter;
