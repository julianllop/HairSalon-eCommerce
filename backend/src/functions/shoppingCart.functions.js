const { User, Product, CartItem, ShoppingCart, Purchase } = require("../db");

const deleteCartContent = async (userId) => {
    const cart = await ShoppingCart.findOne({
        where: { UserId: userId },
    });

    if (!cart) {
        return null;
    }

    await ShoppingCart.destroy({
        where: { UserId: userId },
    });
};

module.exports = {
    deleteCartContent,
};
