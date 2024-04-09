import {
    //PRODUCT
    CLEAR_STATE,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    DELETE_PRODUCTS,
    CREATE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT,
    PRODUCT_DETAIL,
    GET_BY_NAME,
} from "./actionTypes/productActionTypes";

import {
    GET_CART,
    ADD_TO_CART,
    UPDATE_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    GET_CART_QUANTITY,
} from "./actionTypes/shoppingCartActionTypes";

import {
    SET_APPOINTMENT,
    UPDATE_APPOINTMENT,
    GET_APPOINTMENTS,
    DELETE_APPOINTMENT,
    GET_NEXT_7_APPOINTMENTS,
    GET_USER_APPOINTMENTS,
} from "./actionTypes/appointmentActionTypes";

import {
    CREATE_USER,
    GET_USER,
    GET_USERS,
    GET_USER_BY_TOKEN,
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    VERIFY_PASSWORD,
} from "./actionTypes/userActionTypes";

import { GET_ALL_ORDERS, GET_ORDERS } from "./actionTypes/purchaseActionTypes";

const initialState = {
    products: [],
    allProducts: [], //copy
    newProduct: {},
    productById: {},

    users: [],
    userByToken: {},
    allUsers: [], //copy
    user: {},
    newUser: {},
    loggedInUser: {},
    isPasswordCorrect: false,
    updatedUser: {},

    appointments: [],
    allAppointmens: [], //copy
    userAppointments: [],
    newAppointment: {},
    updatedAppointment: {},
    next7Days: [],

    ShoppingCart: [],
    quantity: 0,

    orders: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                newProduct: action.payload,
            };

        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                allProdcts: action.payload,
            };

        case GET_PRODUCT:
            return {
                ...state,
                productById: action.payload,
            };

        case GET_BY_NAME:
            return {
                ...state,
                products: action.payload,
            };

        case CLEAR_STATE:
            return {
                ...state,
                productById: [],
            };

        case PRODUCT_DETAIL:
            return {
                ...state,
                productById: action.payload,
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
                allProducts: state.allProducts.filter(
                    (product) => product.id !== action.payload
                ),
            };
        case DELETE_PRODUCTS:
            return {
                ...state,
                products: [],
                allProducts: [],
            };
        case UPDATE_PRODUCT:
            const updatedProduct = action.payload;
            const updatedProducts = state.products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            return {
                ...state,
                tasks: updatedProducts,
            };

        /////////////////////////////////////////////////////////////////////////////////////////////////////////

        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                allUsers: action.payload,
            };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case GET_USER_BY_TOKEN:
            return {
                ...state,
                userByToken: action.payload,
            };

        case CREATE_USER:
            return {
                ...state,
                newUser: action.payload,
            };
        case UPDATE_USER:
            return {
                ...state,
                updatedUser: action.payload,
            };

        case VERIFY_PASSWORD:
            return {
                ...state,
                isPasswordCorrect: action.payload,
            };
        case LOGIN:
            return {
                ...state,
                loggedInUser: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                loggedInUser: action.payload,
            };

        case SET_APPOINTMENT:
            return {
                ...state,
                newAppointment: action.payload,
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                updatedAppointment: action.payload,
            };
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload,
            };
        case GET_USER_APPOINTMENTS:
            return {
                ...state,
                userAppointments: action.payload,
            };
        case GET_NEXT_7_APPOINTMENTS:
            return {
                ...state,
                next7Days: action.payload,
            };
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: [],
            };

        case GET_CART:
            return {
                ...state,
                ShoppingCart: action.payload,
            };
        case GET_CART_QUANTITY:
            return {
                ...state,
                quantity: action.payload,
            };
        case ADD_TO_CART:
            return {
                ...state,
                ShoppingCart: action.payload,
            };
        case UPDATE_CART:
            return {
                ...state,
                ShoppingCart: action.payload,
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                ShoppingCart: state.ShoppingCart.Products.filter(
                    (product) => product.id !== action.payload
                ),
            };
        case EMPTY_CART:
            return {
                ...state,
                ShoppingCart: [],
            };

        case GET_ALL_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
            };
        default:
            return { ...state };
    }
};

export default rootReducer;
