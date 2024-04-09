const { Purchase } = require("../db");

const { getProductFromDB } = require("../functions/product.functions");
const { getUsernameFromDB } = require("./user.functions");

const getAllPurchasesFromDB = async (userId) => {
    const userOrders = await Purchase.findAll();

    const groupedOrders = userOrders.reduce((acc, order) => {
        // Comprobamos si ya existe una entrada para este orderId
        if (acc[order.orderId]) {
            // Si existe, agregamos este pedido al array existente
            acc[order.orderId].push(order);
        } else {
            // Si no existe, creamos un nuevo array con este pedido
            acc[order.orderId] = [order];
        }

        return acc;
    }, {});

    const groupedOrdersArray = Object.values(groupedOrders);

    return groupedOrdersArray;
};
const getUserPurchasesFromDB = async (userId) => {
    const userOrders = await Purchase.findAll({
        where: {
            UserId: userId,
        },
    });

    const groupedOrders = userOrders.reduce((acc, order) => {
        // Comprobamos si ya existe una entrada para este orderId
        if (acc[order.orderId]) {
            // Si existe, agregamos este pedido al array existente
            acc[order.orderId].push(order);
        } else {
            // Si no existe, creamos un nuevo array con este pedido
            acc[order.orderId] = [order];
        }

        return acc;
    }, {});

    const groupedOrdersArray = Object.values(groupedOrders);

    return groupedOrdersArray;
};

const getCompleteOrders = async (orders) => {
    const completeOrders = await Promise.all(
        orders.map(async (orderGroup) => {
            return await Promise.all(
                orderGroup.map(async (order) => {
                    const username = await getUsernameFromDB(order.UserId);
                    const product = await getProductFromDB(order.ProductId);
                    const formattedCreatedAt = await formatDate(
                        order.createdAt
                    );

                    return {
                        ...order.dataValues,
                        createdAt: formattedCreatedAt,
                        username,
                        product,
                    };
                })
            );
        })
    );

    return completeOrders;
};

function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate =
        date
            .toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "/") +
        "  " +
        date.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
        });
    return formattedDate;
}

module.exports = {
    getAllPurchasesFromDB,
    getUserPurchasesFromDB,
    getCompleteOrders,
};
