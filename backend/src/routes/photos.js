const { Router } = require("express");
const {
    getPhotos,
    createPhotos,
    updatePhotos,
} = require("../controllers/photos.controller");

const photosRouter = Router();

photosRouter.get("/", getPhotos);

photosRouter.post("/", createPhotos);

photosRouter.put("/", updatePhotos);

module.exports = photosRouter;
