require("dotenv").config();
const { Photos } = require("../db");

const getPhotosFromDB = async () => {
    const photos = await Photos.findAll();
    return photos;
};

const createPhotoInDB = async (photo1, photo2, photo3) => {
    const photos = await Photos.create({
        photo1,
        photo2,
        photo3,
    });

    return photos;
};

const updatePhotoInDB = async (photo1, photo2, photo3) => {

    const updatedPhotos = await Photos.findByPk(id);

    if (!updatedPhotos) throw Error("Photos not found!");

    updatedPhotos.photo1 = photo1;
    updatedPhotos.photo2 = photo2;
    updatedPhotos.photo3 = photo3;

    await updatedPhotos.save();

    return updatedPhotos;
};

module.exports = {
    getPhotosFromDB,
    createPhotoInDB,
    updatePhotoInDB,
};
