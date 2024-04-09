const numberREGEX = /^-?\d*\.?\d+$/;
const urlREGEX = /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/;

export function validate(product) {
    let errors = {};

    if (!product.title.trim()) {
        errors.title = "Title can't be empty";
    }

    /************************************************************************************ */

    if (!product.description.trim()) {
        errors.description = "Description can't be empty";
    }

    /************************************************************************************ */

    if (!product.image.trim()) {
        errors.image = "Set an image for this product";
    }

    /************************************************************************************ */

    if (!product.price) {
        errors.price = "Set a price for this product";
    }

    if (!numberREGEX.test(product.price) && product.price) {
        errors.price = "Price should be a number";
    }
    /************************************************************************************ */

    if (!product.category) {
        errors.category = "Set a category for this product";
    }
    /************************************************************************************ */

    if (product.isActive === null) {
        errors.isActive = "Set a status for this product";
    }

    return errors;
}
