require("dotenv").config();
const { Sequelize } = require("sequelize");
const UserModel = require("./models/User");
const AppointmentModel = require("./models/Appointment");
const ProductModel = require("./models/Product");
const ShoppingCartModel = require("./models/ShoppingCart");
const CartItemModel = require("./models/CartItem");
const PurchaseModel = require("./models/Purchase");
const PhotosModel = require("./models/Photos");
// const FavoriteModel = require("./models/Favorite");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, DB_URL } =
    process.env;

const database = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
    { logging: false }
);
// const database = new Sequelize(DB_URL, { logging: false });

UserModel(database);
AppointmentModel(database);
ProductModel(database);
ShoppingCartModel(database);
CartItemModel(database);
PurchaseModel(database);
PhotosModel(database);

const { Appointment, User, Product, ShoppingCart, CartItem, Purchase, Photos } =
    database.models;

User.hasOne(Photos);
Photos.belongsTo(User);

User.hasMany(Appointment, {
    foreignKey: "userId",
});
Appointment.belongsTo(User);
User.hasMany(Product);
Product.belongsTo(User);

User.hasOne(ShoppingCart);
ShoppingCart.belongsTo(User);

Product.belongsToMany(ShoppingCart, { through: "CartItem" });
ShoppingCart.belongsToMany(Product, { through: "CartItem" });

Product.hasOne(CartItem);
ShoppingCart.hasMany(CartItem);

User.hasMany(Purchase, {
    foreignKey: "UserId",
});
Purchase.belongsTo(User);

Product.belongsToMany(Purchase, { through: "BoughtItem" });
Purchase.belongsToMany(Product, { through: "BoughtItem" });

ShoppingCart.hasMany(Purchase);
Purchase.belongsTo(ShoppingCart);

module.exports = { database, ...database.models };
