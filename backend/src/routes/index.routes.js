const { Router } = require("express");


const rUser = require("./user");
const rAppointment = require("./appointment");
const rProduct = require("./product");
const rShoppingCart = require("./shoppingCart");
const rPurchase = require("./purchase");

const mainRouter = Router();

mainRouter.use("/user", rUser);
mainRouter.use("/appointment", rAppointment);
mainRouter.use("/product", rProduct);
mainRouter.use("/shoppingCart", rShoppingCart);
mainRouter.use("/purchase", rPurchase);

module.exports = mainRouter;
