const { DataTypes } = require("sequelize");
const { defaultValueSchemable } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Photos",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            photo1: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
            },
            photo2: {
                type: DataTypes.TEXT("long"),
                allowNull: true,
            },
            photo3: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
};
