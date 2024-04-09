import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { getUserByToken } from "../redux/actions/userActions";

const Landing = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkAuth = () => {
    //         try {
    //             const cookie = document.cookie
    //                 .split(";")
    //                 .find((cookie) => cookie.trim().startsWith("jwt="));
    //             const jwtCookie = cookie.substring(4);
    //             dispatch(getUserByToken(jwtCookie));
    //         } catch (error) {
    //             console.error("User not found:", error);
    //         }
    //     };

    //     checkAuth();
    // }, [dispatch]);

    return (
        <Box>
            <Box>Carrusel</Box>

            <Box>offers</Box>

            <Button
                variant="contained"
                sx={{
                    backgroundColor: "palevioletred",
                    color: "rgb(255, 218, 230)",
                    "&:hover": {
                        backgroundColor: "palevioletred",
                        color: "rgb(255, 218, 230)",
                        opacity: "0.8",
                    },
                }}
            >
                Set appointment
            </Button>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: "palevioletred",
                    color: "rgb(255, 218, 230)",
                    "&:hover": {
                        backgroundColor: "palevioletred",
                        color: "rgb(255, 218, 230)",
                        opacity: "0.8",
                    },
                }}
            >
                Let's shop
            </Button>
        </Box>
    );
};

export default Landing;
