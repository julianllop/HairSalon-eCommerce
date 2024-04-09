import React from "react";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import FilterOutlinedIcon from "@mui/icons-material/FilterOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import style from "./dashboardNavBar.module.css";

const DashboardNavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    return (
        <div className={style.dashboardNavBarContainer}>
            <Button
                variant="contained"
                sx={{
                    borderRadius: "50px",
                    height: "45px",
                    minWidth: "45px",
                    padding: 0,
                    backgroundColor: "palevioletred",

                    "&:hover": {
                        backgroundColor: "palevioletred",
                        opacity: "0.8",
                    },
                }}
                onClick={() => navigate("/")}
            >
                <HomeOutlinedIcon
                    sx={{
                        margin: 0,
                        padding: 0,
                        fontSize: "2rem",
                    }}
                />
            </Button>
            <Button
                variant="contained"
                sx={{
                    borderRadius: "50px",
                    height: "45px",
                    minWidth: "45px",
                    padding: 0,
                    backgroundColor: "palevioletred",

                    "&:hover": {
                        backgroundColor: "palevioletred",
                        opacity: "0.8",
                    },
                }}
                onClick={() => navigate("/dashboard/appointments")}
            >
                <CalendarMonthOutlinedIcon
                    sx={{
                        margin: 0,
                        padding: 0,
                        fontSize: "2rem",
                    }}
                />
            </Button>
            <Button
                variant="contained"
                sx={{
                    borderRadius: "50px",
                    height: "45px",
                    minWidth: "45px",
                    padding: 0,
                    backgroundColor: "palevioletred",

                    "&:hover": {
                        backgroundColor: "palevioletred",
                        opacity: "0.8",
                    },
                }}
                onClick={() => navigate("/dashboard/products")}
            >
                <StoreOutlinedIcon
                    sx={{
                        margin: 0,
                        padding: 0,
                        fontSize: "2rem",
                    }}
                />
            </Button>

            <Button
                variant="contained"
                sx={{
                    borderRadius: "50px",
                    height: "45px",
                    minWidth: "45px",
                    padding: 0,
                    backgroundColor: "palevioletred",

                    "&:hover": {
                        backgroundColor: "palevioletred",
                        opacity: "0.8",
                    },
                }}
                onClick={() => navigate("/dashboard/purchase")}
            >
                <ShoppingBagOutlinedIcon
                    sx={{
                        margin: 0,
                        padding: 0,
                        fontSize: "2rem",
                    }}
                />
            </Button>
        </div>
    );
};

export default DashboardNavBar;
