require("dotenv").config();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.ACCESS_TOKEN_SECRET;

const getUsersFromDB = async () => {
    const users = await User.findAll();
    return users;
};

const getUsernameFromDB = async (id) => {
    const user = await User.findOne({ where: { id } });

    if (!user) {
        return null;
    }

    return user.username;
};

const getUserFromDB = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) return null;

    return user;
};

const isPasswordCorrect = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) return false;

    return true;
};

const createUserInDB = async (username, email, password) => {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password });

    return newUser;
};

const updateUserInDB = async (id, newUsername, newEmail, newPassword) => {
    const updatedUser = await User.findByPk(id);
    const salt = await bcrypt.genSalt();

    if (!updatedUser) throw Error("User not found!");

    updatedUser.username = newUsername;
    updatedUser.email = newEmail;
    updatedUser.password = await bcrypt.hash(newPassword, salt);

    await updatedUser.save();

    return updatedUser;
};

const updateUserRolInDB = async (id) => {
    const updatedUser = await User.findByPk(id);

    if (!updatedUser) throw Error("User not found!");

    updatedUser.rol = "admin";

    await updatedUser.save();

    return updatedUser;
};

const createToken = (id) => {
    const token = jwt.sign({ id }, secret, { expiresIn: "24h" });
    return token;
};

const verifyToken = async (token) => {
    const decodedUser = jwt.verify(token, secret, async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
        } else {
            const user = await User.findByPk(decodedToken.id);
            const userData = {
                id: user.id,
                username: user.username,
                email: user.email,
                rol: user.rol,
            };

            return userData;
        }
    });
    return decodedUser;
};

const deleteUserInDB = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("User not found");
    }

    await user.destroy();
};

module.exports = {
    getUsernameFromDB,
    getUsersFromDB,
    getUserFromDB,
    createUserInDB,
    updateUserInDB,
    deleteUserInDB,
    createToken,
    verifyToken,
    isPasswordCorrect,
    updateUserRolInDB,
};
