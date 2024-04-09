const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Appointment",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            day: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            serviceType: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
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
