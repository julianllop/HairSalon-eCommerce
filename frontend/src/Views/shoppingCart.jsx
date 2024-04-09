import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    getCart,
    getCartQuantity,
    updateCart,
} from "../redux/actions/shoppingCartActions";
import {
    Box,
    Button,
    MenuItem,
    Typography,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    Divider,
    ListItemIcon,
    Badge,
    useMediaQuery,
} from "@mui/material";
import CartProduct from "../Components/cartProduct/cartProduct";
import { getUserByToken } from "../redux/actions/userActions";
import EmptyCart from "../Components/emptyCart/emptyCart";
import CheckOutProducts from "./checkOutProducts/checkOutProducts";

const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width:450px)");
    const isVerticalScreen = useMediaQuery("(max-width:1100px)");

    const shoppingCart = useSelector((state) => state.ShoppingCart.Products);
    const shoppingCartId = useSelector((state) => state.ShoppingCart.id);
    const user = useSelector((state) => state.userByToken);

    const totalCartPrice = 0;
    const totalPrice = useSelector((state) =>
        state?.ShoppingCart?.Products?.reduce(
            (total, product) =>
                total + product?.price * product?.CartItem?.quantity,
            totalCartPrice
        ).toFixed(2)
    );

    const checkAuth = async () => {
        try {
            const cookie = document.cookie
                .split(";")
                .find((cookie) => cookie.trim().startsWith("jwt="));
            const jwtCookie = cookie.substring(4);
            const decodedUser = await dispatch(getUserByToken(jwtCookie));
            return decodedUser;
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            if (!shoppingCart || !shoppingCart.length === 0) {
                dispatch(getCart(user.id));
            }
        }
    }, [dispatch, user, shoppingCart]);

    const productsToCheckout = shoppingCart?.map((product) => ({
        id: product.id,
        title: product.title,
        quantity: product.CartItem.quantity,
        price: product.price,
    }));

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "start",
                minWidth: "90%",
                height: "100vh",
                paddingTop: 10,
                paddingBottom: 5,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "center",
                    minWidth: "100%",
                    gap: "50px",

                    ...(isVerticalScreen && {
                        flexDirection: "column",
                        alignItems: "center",
                    }),
                }}
            >
                {shoppingCart?.length ? (
                    <Box
                        sx={{
                            minWidth: "45%",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "column",
                            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                            padding: "1.5rem",
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            borderRadius: "10px",
                            gap: "15px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "fit-content",
                            maxHeight: "80vh",
                            msOverflowStyle: "none", // -ms-overflow-style: none;
                            "&::-webkit-scrollbar": {
                                // &::-webkit-scrollbar
                                width: "5px",
                                borderRadius: "25px",
                            },
                            "&::-webkit-scrollbar-track": {
                                // &::-webkit-scrollbar-track
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",
                                background: "rgb(255, 247, 249)",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                // &::-webkit-scrollbar-thumb
                                background: "#b4b4b4",
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                // &::-webkit-scrollbar-thumb:hover
                                background: "#848484",
                            },

                            ...(isVerticalScreen && {
                                minWidth: "90%",
                            }),
                            ...(isSmallScreen && {
                                padding: "1rem",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                minWidth: "80%",
                            }),
                        }}
                    >
                        {shoppingCartId &&
                            Array.isArray(shoppingCart) &&
                            shoppingCart?.length > 0 &&
                            shoppingCart?.map((product) => (
                                <CartProduct
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    userId={user.id}
                                    quantity={product.CartItem.quantity}
                                    cartId={shoppingCartId}
                                />
                            ))}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            minWidth: "45%",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                            // flexDirection: "column",
                            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                            padding: "1.5rem",
                            paddingTop: "1rem",
                            paddingBottom: "1rem",
                            borderRadius: "10px",
                            gap: "15px",
                            overflowY: "auto",
                            overflowX: "hidden",
                            height: "fit-content",
                            maxHeight: "80vh",
                            msOverflowStyle: "none", // -ms-overflow-style: none;
                            "&::-webkit-scrollbar": {
                                // &::-webkit-scrollbar
                                width: "5px",
                                borderRadius: "25px",
                            },
                            "&::-webkit-scrollbar-track": {
                                // &::-webkit-scrollbar-track
                                borderTopRightRadius: "10px",
                                borderBottomRightRadius: "10px",
                                background: "rgb(255, 247, 249)",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                // &::-webkit-scrollbar-thumb
                                background: "#b4b4b4",
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                // &::-webkit-scrollbar-thumb:hover
                                background: "#848484",
                            },

                            ...(isVerticalScreen && {
                                minWidth: "90%",
                                flexDirection: "column",
                            }),
                            ...(isSmallScreen && {
                                padding: "1rem",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                minWidth: "80%",
                            }),
                        }}
                    >
                        <Typography 
                        variant="h6"
                        component={"h3"}
                        sx={{
                            textAlign: "left"
                        }}>
                            No products in cart, go to product's section to see
                            if you like something
                        </Typography>
                        <Button
                            sx={{
                                border: "solid 1px rgb(165, 54, 91)",
                                color: "rgb(165, 54, 91)",
                                "&:hover": {
                                    border: "solid 1px rgb(165, 54, 91)",
                                    color: "rgb(165, 54, 91)",
                                    backgroundColor: "rgb(165, 54, 91, 0.1)"
                                },
                            }}
                            onClick={() => navigate('/products')}
                        >
                            shop
                        </Button>
                    </Box>
                )}

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                        minWidth: "30%",
                        height: "250px",
                        paddingTop: 2,
                        paddingBottom: 2,
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px 2px rgba(0, 0, 0, 0.15)",

                        ...(isVerticalScreen && {
                            minWidth: "98%",
                        }),
                        ...(isSmallScreen && {
                            height: "150px",
                            paddingTop: 1,
                            paddingBottom: 1,
                        }),
                    }}
                >
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "start",
                            fontSize: "clamp(15px, 4vw, 1.5rem)",
                            minWidth: "90%",
                        }}
                    >
                        ShoppingCart
                    </Typography>
                    <Box
                        sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.15)",
                            height: "1px",
                            minWidth: "100%",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-between",
                            minWidth: "90%",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "clamp(15px, 4vw, 1.5rem)",
                            }}
                        >
                            Total
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "clamp(15px, 4vw, 1.5rem)",
                            }}
                        >
                            ${totalPrice}
                        </Typography>
                    </Box>
                    {/* <Button
                        variant="contained"
                        sx={{
                            minWidth: "90%",
                            height: "50px",
                            fontSize: "1.2rem",
                        }}
                        onClick={() => navigate("/checkout")}
                    >
                        Pay now
                    </Button> */}
                    <CheckOutProducts
                        products={shoppingCart}
                        productsToCheckout={productsToCheckout}
                        userId={user.id}
                        cartId={shoppingCartId}
                    />
                    <EmptyCart userId={user.id} shoppingCart={shoppingCart} />
                </Box>
            </Box>
        </Box>
    );
};

export default ShoppingCart;
