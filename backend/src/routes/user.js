const { Router } = require("express");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    setCookie,
    verifyPassword,
    updateUserRol
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/token", getUser);

userRouter.get("/login/:id", setCookie);

userRouter.post("/", createUser);

userRouter.put("/", updateUser);

userRouter.put("/:id", updateUserRol);

userRouter.post("/login", login);

userRouter.post("/verify", verifyPassword);

userRouter.get("/cookie", setCookie);

userRouter.get("/logout", logout);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
