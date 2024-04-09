import axios from "axios";
import { GET_ALL_ORDERS, GET_ORDERS } from "../actionTypes/purchaseActionTypes";

export const getAllOrders = (userId) => {
    return async (dispatch) => {
        try {
            const ordersFromDB = await axios.get(`/purchase`);
            let orders = ordersFromDB.data;

            return dispatch({
                type: GET_ALL_ORDERS,
                payload: orders,
            });
        } catch (error) {
            console.log("Orders not found (client): ", error);
        }
    };
};

export const getUserOrders = (userId) => {
    return async (dispatch) => {
        try {
            const ordersFromDB = await axios.get(`/purchase/${userId}`);
            let orders = ordersFromDB.data;

            return dispatch({
                type: GET_ORDERS,
                payload: orders,
            });
        } catch (error) {
            console.log("Orders not found (client): ", error);
        }
    };
};
