import React from "react";
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
    Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import style from "./dashboardProduct.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const DashboardProduct = ({
    id,
    title,
    image,
    description,
    price,
    category,
    isActive,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width:400px)");

    const clientProduct = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "200px",
        opacity:
            location.pathname.startsWith("/dashboard") || isActive ? 1 : 0.4,
        height: location.pathname.startsWith("/dashboard")
            ? "fit-content"
            : "280px",
        padding: "15px",

        ...(isSmallScreen && {
            minWidth: "180px",
            height: location.pathname.startsWith("/dashboard")
                ? "245px"
                : "220px",
            padding: 0,
        }),
    };

    return (
        <Box sx={clientProduct}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <img src={image} alt={title} className={style.clientImage} />
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        flexDirection: "row",
                        height: "fit-content",
                        minWidth: "100%",
                        paddingTop: "1rem",

                        ...(isSmallScreen && { paddingLeft: 0 }),
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "start",
                            flexDirection: "column",
                            minWidth: "50%",

                            paddingLeft: location.pathname.startsWith(
                                "/dashboard"
                            )
                                ? ""
                                : "2rem",

                            ...(isSmallScreen && { paddingLeft: 0 }),
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "clamp(15px, 4vw, 1rem)",
                                fontWeight: 700,
                                color: "rgb(165, 54, 91,1)",
                                textAlign: "left",
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "start",
                                flexDirection: "column",
                                minWidth: "100%",
                                fontSize: "clamp(20px, 4vw, 1.5rem)",
                                fontWeight: 700,
                                color: "rgb(165, 54, 91)",
                                textAlign: "left",

                                ...(isSmallScreen && { paddingLeft: 0 }),
                            }}
                        >
                            ${price}
                        </Typography>
                        {location.pathname.startsWith("/dashboard") && (
                            <Typography
                                color={isActive ? "#2E7D32" : "#D32F2F"}
                                sx={{
                                    backgroundColor: isActive
                                        ? "#2e7d3254"
                                        : "#d32f2f5c",
                                    minWidth: "fit-content",
                                    padding: "0px 10px 0px 10px",
                                    borderRadius: "5px",
                                    fontSize: "clamp(15px, 2.5vw, 1rem)",
                                }}
                            >
                                {isActive ? "is active" : "not active"}
                            </Typography>
                        )}
                    </Box>
                    {location.pathname.startsWith("/dashboard") && (
                        // <Box
                        //     sx={{
                        //         display: "flex",
                        //         flexDirection: "column",
                        //         justifyContent: "space-between",
                        //         alignItems: "end",
                        //         minWidth: "50%",
                        //         height: "100%",
                        //         // paddingLeft: "2rem",

                        //         ...(isSmallScreen && { paddingLeft: 0 }),
                        //     }}
                        // >
                        <Button
                            sx={{
                                minWidth: 20,
                                backgroundColor: "#1976D2",
                                color: "white",
                                borderRadius: "10px",
                                "&:hover": {
                                    color: "#1976D2",
                                },
                                border: "1px solid #1976D2",
                                alignSelf: "flex-end",
                            }}
                            onClick={() =>
                                navigate(`/dashboard/products/${id}`)
                            }
                        >
                            <EditIcon />
                        </Button>
                        // </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardProduct;
