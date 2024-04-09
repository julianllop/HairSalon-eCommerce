import axios from "axios";

import {
    GET_CART,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    GET_CART_QUANTITY,
} from "../actionTypes/shoppingCartActionTypes";

export const getCart = (userId) => {
    return async (dispatch) => {
        try {
            const shoppingCart = await axios.get(`/shoppingCart/${userId}`);
            const cart = shoppingCart.data;

            dispatch({
                type: GET_CART,
                payload: cart,
            });
        } catch (error) {
            console.log("Error getting cart products (client)", error);
        }
    };
};

export const getCartQuantity = (userId) => {
    return async (dispatch) => {
        try {
            const shoppingCart = await axios.get(
                `/shoppingCart/quantity/${userId}`
            );
            const quantity = shoppingCart.data;

            dispatch({
                type: GET_CART_QUANTITY,
                payload: quantity,
            });
        } catch (error) {
            console.log("Error getting cart quantity (client)", error);
        }
    };
};

export const addToCart = (userId, productId) => {
    const cartProduct = {
        userId,
        productId,
    };
    console.log(cartProduct);

    return async (dispatch) => {
        try {
            const newCartProduct = await axios.post(
                `/shoppingCart/add`,
                cartProduct
            );

            return dispatch({
                type: ADD_TO_CART,
                payload: newCartProduct.data,
            });
        } catch (error) {
            console.log("Error adding product to cart (client)", error);
        }
    };
};

export const updateCart = (updatedCart) => {
    return async (dispatch) => {
        try {
            const updatedItem = await axios.put(`/shoppingCart`, updatedCart);
            return dispatch({
                type: UPDATE_CART,
                payload: updatedItem.data,
            });
        } catch (error) {
            console.log("Couldn't update cart product (client): ", error);
        }
    };
};

// POST ACTIONS

export const removeFromCart = (productId, userId) => {
    return async (dispatch) => {
        try {
            const cartProduct = {
                userId,
                productId,
            };

            const deletedProduct = await axios.post(
                `/shoppingCart/remove`,
                cartProduct
            );

            dispatch({
                type: REMOVE_FROM_CART,
                payload: deletedProduct.data,
            });
        } catch (error) {
            console.log(
                "There was an error deleting the product from cart (client)",
                error
            );
            console.log("Server response:", error.response.data);
        }
    };
};

export const clearCart = (userId) => {
    return async (dispatch) => {
        try {
            const emptyCart = await axios.delete(`/shoppingCart/${userId}`);
            dispatch({ type: EMPTY_CART, payload: emptyCart.data });
        } catch (error) {
            console.log("There was an error emptying the cart (client)", error);
            throw error;
        }
    };
};
