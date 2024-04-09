import axios from "axios";
import {
    //USERS
    CREATE_USER,
    LOGIN,
    GET_USER_BY_TOKEN,
    LOGOUT,
    VERIFY_PASSWORD,
    UPDATE_USER,
} from "../actionTypes/userActionTypes";
import { GET_CART_QUANTITY } from "../actionTypes/shoppingCartActionTypes";

// GET ACTIONS

// DELETE ACTIONS

export const deleteDataAndUpdateState = async (dispatch, endpoint, type) => {
    try {
        const deleteData = await axios.delete(endpoint);
        const deletedItem = deleteData.data;

        dispatch({
            type,
            payload: deletedItem,
        });
    } catch (error) {
        console.log(`There was an error: (${type})`, error);
    }
};

export const setEditing = (payload) => {
    return {
        type: "SET_EDITING",
        payload: payload,
    };
};

// USERS
export const createUser = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const newUser = await axios.post(`/user`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const createdUser = newUser.data;

            await axios.get(`/user/login/${createdUser.id}`, {
                withCredentials: true,
            });

            dispatch({
                type: CREATE_USER,
                payload: createdUser,
            });
        } catch (error) {
            console.log("There was an error creating the user (client)", error);
        }
    };
};
export const updateUser = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const newData = await axios.put(`/user`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const updatedUser = newData.data;

            dispatch({
                type: UPDATE_USER,
                payload: updatedUser,
            });
        } catch (error) {
            console.log("There was an error updating the user (client)", error);
        }
    };
};

export const login = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const user = await axios.post("/user/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const loggedInUser = user.data;

            console.log(loggedInUser);

            await axios.get(`/user/login/${loggedInUser.id}`, {
                withCredentials: true,
            });

            const quantity = await axios.get(
                `/shoppingCart/quantity/${loggedInUser.id}`
            );

            dispatch({
                type: GET_CART_QUANTITY,
                payload: quantity.data,
            });

            dispatch({
                type: LOGIN,
                payload: loggedInUser,
            });
        } catch (error) {
            console.log("There was an error trying to login (client)", error);
        }
    };
};

export const checkPassword = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const isPasswordCorrect = await axios.post("/user/verify", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            console.log(isPasswordCorrect.data);

            dispatch({
                type: VERIFY_PASSWORD,
                payload: isPasswordCorrect.data,
            });
        } catch (error) {
            console.log(
                "There was an error trying to check your password (client)",
                error
            );
        }
    };
};

export const getUserByToken = (token) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };
            const userByToken = await axios.get("/user/token", config);
            const user = userByToken.data;

            dispatch({
                type: GET_USER_BY_TOKEN,
                payload: user,
            });
        } catch (error) {
            console.log("User not found (client): ", error);
        }
    };
};

export const logout = (payload) => {
    return async (dispatch) => {
        try {
            const loggedOut = await axios.get("/user/logout", {
                // Sending cookies from the client to the server
                withCredentials: true,
            });
            const loggedOutUser = loggedOut.data;

            dispatch({
                type: LOGOUT,
                payload: loggedOutUser,
            });
        } catch (error) {
            console.log("There was an error trying to logout (client)", error);
        }
    };
};
