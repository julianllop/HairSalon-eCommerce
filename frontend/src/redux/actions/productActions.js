import axios from "axios";

import {
    //PRODUCT
    CLEAR_STATE,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_PRODUCTS,
    CREATE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    GET_BY_NAME,
    // PRODUCT_DETAIL,
} from "../actionTypes/productActionTypes";

export const getProducts = (selectedCategories, orderBy) => {
    return async (dispatch) => {
        try {
            const productsFromDB = await axios.get(`/product`);
            let allProducts = productsFromDB.data;

            console.log(allProducts);

            // Ordenar por defecto de menor a mayor por id
            allProducts.sort((a, b) => a.id - b.id);

            if (selectedCategories.length === 0) {
                // Aplicar ordenación según el parámetro orderBy
                if (orderBy === "A-Z") {
                    allProducts.sort((a, b) => a.title.localeCompare(b.title));
                } else if (orderBy === "Z-A") {
                    allProducts.sort((a, b) => b.title.localeCompare(a.title));
                } else if (orderBy === "Lower") {
                    allProducts.sort((a, b) => a.price - b.price);
                } else if (orderBy === "Higher") {
                    allProducts.sort((a, b) => b.price - a.price);
                }

                return dispatch({ type: GET_PRODUCTS, payload: allProducts });
            }

            const filteredProducts = allProducts.filter((product) =>
                selectedCategories.includes(product.category)
            );

            // Aplicar ordenación según el parámetro orderBy
            if (orderBy === "A-Z") {
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            } else if (orderBy === "Z-A") {
                filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            } else if (orderBy === "Lower") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (orderBy === "Higher") {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            return dispatch({ type: GET_PRODUCTS, payload: filteredProducts });
        } catch (error) {
            console.log("Products not found (client): ", error);
        }
    };
};

export function getByName(title) {
    return async (dispatch) => {
        try {
            const product = await axios.get(`/product?title=${title}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: product.data,
            });
        } catch (error) {
            console.log("There is no product with that name ", error);
        }
    };
}

export const getProduct = (id) => {
    return async (dispatch) => {
        try {
            const productById = await axios.get(`/product/${id}`);
            const product = productById.data;
            return dispatch({
                type: GET_PRODUCT,
                payload: product,
            });
        } catch (error) {
            console.log("Product not found (client): ", error);
        }
    };
};

export const filterByCategory = () => {};

export const clearState = () => {
    return { type: CLEAR_STATE };
};

// POST ACTIONS

export const createProduct = (payload) => {
    return async (dispatch) => {
        try {
            const newProduct = await axios.post(`/product`, payload);
            const createdProduct = newProduct.data;

            dispatch({
                type: CREATE_PRODUCT,
                payload: createdProduct,
            });
        } catch (error) {
            console.log(
                "There was an error creating the product (client)",
                error
            );
            console.log("Server response:", error.response.data);
        }
    };
};

// PUT ACTIONS

export const updateProduct = (id, payload) => {
    return async (dispatch) => {
        try {
            if (!payload || typeof payload !== "object") {
                throw new Error("Invalid payload for updating product");
            }

            const updateData = await axios.put(`/product/${id}`, payload);
            const updatedProduct = updateData.data;

            dispatch({
                type: UPDATE_PRODUCT,
                payload: updatedProduct,
            });
        } catch (error) {
            console.log(
                "There was an error updating the product (client)",
                error
            );
            throw error;
        }
    };
};

export const deleteProducts = () => {
    return async (dispatch) => {
        try {
            const deleteData = await axios.delete("/product");
            const deletedProducts = deleteData.data;

            dispatch({
                type: DELETE_PRODUCTS,
                payload: deletedProducts,
            });
        } catch (error) {
            console.log("There was an error deleting tasks (client)", error);
        }
    };
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            const deleteData = await axios.delete(`/product/${id}`);
            const deletedProduct = deleteData.data;

            dispatch({
                type: DELETE_PRODUCT,
                payload: deletedProduct,
            });
        } catch (error) {
            console.log("There was an error deleting product (client)", error);
        }
    };
};
