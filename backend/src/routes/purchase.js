const { Router } = require("express");
const {
    getAllPurchases,
    getUserPurchases,
} = require("../controllers/purchase.controller");

const purchaseRouter = Router();

purchaseRouter.get("/", getAllPurchases);

purchaseRouter.get("/:userId", getUserPurchases);

module.exports = purchaseRouter;
