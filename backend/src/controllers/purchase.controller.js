const {
    getAllPurchasesFromDB,
    getUserPurchasesFromDB,
    getCompleteOrders,
} = require("../functions/purchase.functions");

const getAllPurchases = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await getAllPurchasesFromDB();
        const completeOrders = await getCompleteOrders(orders);
        res.status(201).json(completeOrders);
    } catch (error) {
        res.status(400).json({
            message: "Error getting your orders",
            error: error.message,
        });
    }
};

const getUserPurchases = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await getUserPurchasesFromDB(userId);
        const completeOrders = await getCompleteOrders(orders);
        res.status(201).json(completeOrders);
    } catch (error) {
        res.status(400).json({
            message: "Error getting your orders",
            error: error.message,
        });
    }
};

module.exports = {
    getAllPurchases,
    getUserPurchases,
};
