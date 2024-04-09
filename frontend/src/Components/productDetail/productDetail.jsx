import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, getProduct } from "../../redux/actions/productActions";
import {
    Box,
    Fade,
    Modal,
    Button,
    Typography,
    Backdrop,
    useMediaQuery,
    MenuItem,
    FormControl,
    styled,
    TextField,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import style from "./productDetail.module.css";
import {
    addToCart,
    getCart,
    getCartQuantity,
} from "../../redux/actions/shoppingCartActions";
import { getUserByToken } from "../../redux/actions/userActions";
import CheckOutOne from "../checkOutOne/checkOutOne";

const ProductDetail = () => {
    const { id } = useParams();

    const [productId, setProductId] = useState(parseInt(id));
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const product = useSelector((state) => state.productById);
    const user = useSelector((state) => state.userByToken);

    const isSmallScreen = useMediaQuery("(max-width:600px)");

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                return decodedUser;
            }, 10);
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(clearState(id));
    }, [dispatch, id]);

    const handleAddToCart = async (userId, productId) => {
        await dispatch(addToCart(userId, productId));
        await dispatch(getCartQuantity(userId));
        await dispatch(getCart(userId));
    };

    return (
        <Box
            sx={{
                minWidth: "100%",
                height: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "start",
                flexDirection: "row",
                marginTop: 10,
            }}
        >
            <Box
                sx={{
                    height: "250px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "end",
                    gap: "50px",

                    ...(isSmallScreen && {
                        height: "fit-content",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: "100%",
                    }),
                }}
            >
                <img
                    src={product.image}
                    alt={product.title}
                    className={style.img}
                />
                <Box
                    sx={{
                        // height: "250px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                    }}
                >
                    <Box
                        sx={{
                            // height: "250px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "start",
                            minWidth: "40%",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "rgb(165, 54, 91)",
                                fontSize: "clamp(20px, 4vw, 1.5rem)",
                            }}
                        >
                            {product.title}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgb(165, 54, 91)",
                                fontSize: "clamp(20px, 4vw, 1.5rem)",
                            }}
                        >
                            ${product.price}
                        </Typography>
                        <Typography
                            sx={{
                                color: "rgb(165, 54, 91, 0.7)",
                                fontSize: "clamp(15px, 4vw, 1rem)",
                            }}
                        >
                            Category: {product.category}
                        </Typography>

                        <Typography
                            component={"span"}
                            sx={{
                                minWidth: "40px",
                                color: "rgb(165, 54, 91, 0.7)",
                                fontSize: "clamp(15px, 4vw, 1rem)",
                                textWrap: "wrap",
                            }}
                        >
                            Details: {product.description}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() =>
                                handleAddToCart(user.id, productId, quantity)
                            }
                            sx={{
                                // padding: 0,
                                minWidth: "fit-content",
                                backgroundColor: "transparent",
                                fontSize: "clamp(10px, 4vw, 0.9rem)",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                        >
                            Add to cart
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
