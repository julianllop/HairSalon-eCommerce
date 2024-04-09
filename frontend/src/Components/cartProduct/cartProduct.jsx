import React, { useEffect, useState } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import {
    getCart,
    getCartQuantity,
    removeFromCart,
    updateCart,
} from "../../redux/actions/shoppingCartActions";
import DeleteCartProduct from "../deleteCartProduct/deleteCartProduct";
import CheckOutOne from "../checkOutOne/checkOutOne";
import style from "./cartProduct.module.css";

const CartProduct = ({ id, title, image, price, userId, cartId }) => {
    const dispatch = useDispatch();

    const isSmallScreen = useMediaQuery("(max-width:450px)");
    const isVerticalScreen = useMediaQuery("(max-width:1100px)");

    const quantity = useSelector((state) => {
        const cartItem = state.ShoppingCart.Products.find(
            (item) => item.id === id
        );
        return cartItem ? cartItem.CartItem.quantity : 0;
    });

    const handleDeleteOne = async (productId, quantity) => {
        await dispatch(updateCart({ productId, quantity: quantity - 1 }));
        await dispatch(getCartQuantity(userId));
    };

    const handleAddOne = async (productId, quantity) => {
        await dispatch(updateCart({ productId, quantity: quantity + 1 }));
        await dispatch(getCartQuantity(userId));
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "white",
                minWidth: "100%",
                height: "150px",
                padding: "0px 1rem 0px 1rem",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",

                ...(isVerticalScreen && {
                    padding: "0px 0.5rem 0px 0.5rem",
                }),
                ...(isSmallScreen && {
                    height: "80px",
                }),
            }}
        >
            <img src={image} alt={title} className={style.img} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "center",
                    minWidth: "fit-content",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "fit-content",
                        gap: "10px",
                    }}
                >
                    <DeleteCartProduct
                        title={title}
                        quantity={quantity}
                        productId={id}
                        userId={userId}
                    />

                    <CheckOutOne
                        title={title}
                        quantity={quantity}
                        id={id}
                        userId={userId}
                        price={price}
                        cartId={cartId}
                    />
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Button
                    onClick={() => handleDeleteOne(id, quantity)}
                    disabled={quantity === 1}
                    sx={{
                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                        minWidth: "fit-content",
                    }}
                >
                    -
                </Button>
                <Typography
                    sx={{
                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                    }}
                >
                    {quantity}
                </Typography>
                <Button
                    onClick={() => handleAddOne(id, quantity)}
                    sx={{
                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                        minWidth: "fit-content",
                    }}
                >
                    +
                </Button>
            </Box>
            <Typography
                sx={{
                    fontSize: "clamp(10px, 4vw, 1.2rem)",
                }}
            >
                ${price}
            </Typography>
        </Box>
    );
};

export default CartProduct;
