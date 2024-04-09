const { DataTypes } = require("sequelize");

module.exports = (database) => {
    const CartItem = database.define("CartItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    });

    return CartItem;
};
