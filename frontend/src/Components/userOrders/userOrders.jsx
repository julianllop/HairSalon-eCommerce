import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../../redux/actions/userActions";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { getUserOrders } from "../../redux/actions/purchaseActions";
import style from "./userOrdes.module.css";

const UserOrders = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userByToken);
    const orders = useSelector((state) => state.orders);

    const [dataLoaded, setDataLoaded] = useState(false);

    const isSmallScreen = useMediaQuery("(max-width:420px)");
    const isPhoneScreen = useMediaQuery("(max-width:500px)");
    const isMediumScreen = useMediaQuery("(max-width:750px)");

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                return decodedUser;
            }, 100);
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
            dispatch(getUserOrders(user.id));
            setDataLoaded(true);
            console.log(dataLoaded);
        };

        fetchData();
    }, [dispatch, user.id]);

    return (
        <Box
            sx={{
                minWidth: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 5,
            }}
        >
            <Typography
                sx={{
                    background:
                        "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 193, 212)  100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1px, 7.5vw, 3rem)",
                    fontWeight: 700,
                    marginBottom: "20px",
                }}
            >
                My orders
            </Typography>
            <Box
                sx={{
                    minWidth: "60%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    // boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                    padding: "1.5rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    borderRadius: "10px",
                    gap: "15px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "fit-content",
                    maxHeight: "600px",
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

                    ...(isPhoneScreen && {
                        padding: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        // minWidth: "20%"
                    }),

                    ...(isMediumScreen && {
                        minWidth: "85%",
                    }),
                }}
            >
                {orders &&
                    orders.map((orderGroup, index) => (
                        <Box
                            key={index}
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "10px",
                                gap: "20px",
                                backgroundColor: "white",
                                padding: "10px",
                                boxShadow:
                                    "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                            }}
                        >
                            {orderGroup.map((order, index) => (
                                <Box
                                    sx={{
                                        minWidth: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        key={index}
                                        sx={{
                                            minWidth: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            gap: "15px",
                                        }}
                                    >
                                        {order.product &&
                                            order.product.image && (
                                                <Box
                                                    sx={{
                                                        minWidth: "5vw",
                                                        display: "flex",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <img
                                                        src={
                                                            order.product.image
                                                        }
                                                        alt={
                                                            order.product.title
                                                        }
                                                        className={style.img}
                                                    />
                                                </Box>
                                            )}
                                        <Box
                                            sx={{
                                                minWidth: "80%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "start",
                                                // gap: "25px",

                                                ...(isPhoneScreen && {
                                                    minWidth: "60%",
                                                }),
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    minWidth: "75%",
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems: "start",

                                                    ...(isPhoneScreen && {
                                                        flexDirection: "column",
                                                        minWidth: "50%",
                                                    }),
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: "rgb(165, 54, 91)",
                                                        fontSize:
                                                            "clamp(10px, 4vw, 1rem)",
                                                        minWidth: "25%",
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "start",
                                                    }}
                                                >
                                                    {order.product.title} x
                                                    {order.quantity}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        minWidth: "25%",
                                                        color: "rgb(165, 54, 91)",
                                                        fontSize:
                                                            "clamp(10px, 4vw, 1rem)",
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "start",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {order.createdAt}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                sx={{
                                                    minWidth: "25%",

                                                    color: "rgb(165, 54, 91)",
                                                    fontSize:
                                                        "clamp(10px, 4vw, 1rem)",
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    // alignItems: "end",
                                                }}
                                            >
                                                $
                                                {order.product.price *
                                                    order.quantity}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                            <Box
                                sx={{
                                    minWidth: "100%",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    alignItems: "center",
                                    gap: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "rgb(165, 54, 91)",
                                        fontSize: "clamp(10px, 4vw, 1rem)",
                                    }}
                                >
                                    total:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "rgb(165, 54, 91)",
                                        fontSize: "clamp(10px, 4vw, 1rem)",
                                    }}
                                >
                                    $
                                    {orderGroup
                                        .reduce(
                                            (total, order) =>
                                                total +
                                                order.product.price *
                                                    order.quantity,
                                            0
                                        )
                                        .toFixed(2)}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default UserOrders;
