const {
    getPhotosFromDB,
    createPhotoInDB,
    updatePhotoInDB,
} = require("../functions/photos.functions");

const getPhotos = async (req, res) => {
    try {
        const photos = await getPhotosFromDB();

        res.status(200).json(photos);
    } catch (error) {
        res.status(400).json({
            message: "Error getting all photos",
            error: error.message,
        });
    }
};

const createPhotos = async (req, res) => {
    const { photo1, photo2, photo3 } = req.body;

    try {
        const newPhoto = await createPhotoInDB(photo1, photo2, photo3);

        res.status(201).json(newPhoto);
    } catch (error) {
        res.status(400).json({
            message: "Error at creating new photo",
            error: error.message,
        });
    }
};

const updatePhotos = async (req, res) => {
    const { id } = req.params;
    const { photo1, photo2, photo3 } = req.body;

    try {
        const updatedPhotos = await updatePhotoInDB(id, photo1, photo2, photo3);
        res.status(201).json(updatedPhotos);
    } catch (error) {
        res.status(400).json({
            message: "Error at updating photos",
            error: error.message,
        });
    }
};

module.exports = {
    getPhotos,
    createPhotos,
    updatePhotos,
};
