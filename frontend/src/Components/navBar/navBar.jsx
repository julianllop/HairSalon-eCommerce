import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken, logout } from "../../redux/actions/userActions";
import useMediaQuery from "@mui/material/useMediaQuery";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Logout from "@mui/icons-material/Logout";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
    getCart,
    getCartQuantity,
} from "../../redux/actions/shoppingCartActions";
import { selectCartItemCount } from "../../redux/cartSelectors";

import style from "./navBar.module.css";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const quantity = useSelector((state) => state.quantity);
    const user = useSelector((state) => state.userByToken);
    const loggedInUser = useSelector((state) => state.loggedInUser);

    useEffect(() => {
        if (isLoggedIn && user && user.id) {
            dispatch(getCartQuantity(user.id));
        }
    }, [isLoggedIn, user, dispatch, quantity]);

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie?.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                setIsLoggedIn(true);
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
        const checkJwt = async () => {
            try {
                setTimeout(() => {
                    const jwtCookie = document.cookie
                        .split(";")
                        .find((cookie) => cookie.trim().startsWith("jwt="));

                    if (!jwtCookie) {
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                    }
                }, 100);
            } catch (error) {
                console.error("Auth error:", error);
            }
        };

        checkJwt();
    }, [navigate, location.pathname]);

    const firstLetter = user?.username ? user.username[0].toUpperCase() : "";

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleOpenMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setIsOpen(false);
    };

    const isPhone = useMediaQuery("(max-width:500px)");
    const isSmallScreen = useMediaQuery("(max-width:600px)");
    // const isMediumScreen = useMediaQuery("(min-width:650px)");

    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
            right: quantity < 10 ? -6 : -11,
            top: -3,
            padding: "0 4px",
            backgroundColor: "tomato",
        },
    }));

    return (
        <div className={style.navBar}>
            <Box
                sx={{
                    backgroundColor: "rgb(255, 218, 230)",
                    /* position: fixed,
        left: 0,
        top: 0, */
                    minWidth: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: " space-between",
                    alignItems: "center",
                    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.318)",
                    zIndex: 1000,
                    position: "relative",
                }}
            >
                {isLoggedIn && user && loggedInUser && (
                    <Box
                        sx={{
                            minWidth: "30%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                            paddingLeft: "10rem",

                            ...(isSmallScreen && { paddingLeft: "4rem" }),
                            ...(isSmallScreen &&
                                isPhone && { paddingLeft: "0rem" }),
                        }}
                    >
                        {isPhone ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenMenu}
                                    sx={{
                                        display: isPhone ? "flex" : "none",
                                        minWidth: "60px",
                                        height: "60px",
                                        borderRadius: "0px",
                                        backgroundColor: "palevioletred",
                                        color: "palevioletred",

                                        "&:hover": {
                                            backgroundColor: "palevioletred",
                                        },
                                    }}
                                >
                                    {isOpen ? (
                                        <CloseOutlinedIcon
                                            sx={{
                                                color: "rgb(255, 218, 230)",
                                            }}
                                        />
                                    ) : (
                                        <MenuOutlinedIcon
                                            sx={{
                                                color: "rgb(255, 218, 230)  ",
                                            }}
                                        />
                                    )}
                                </Button>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    minWidth: "30%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <NavLink
                                    to="/"
                                    className={style.link}
                                    onClick={handleNavigation}
                                >
                                    Appointments
                                </NavLink>
                                <NavLink
                                    to="/products"
                                    className={style.link}
                                    onClick={handleNavigation}
                                >
                                    Products
                                </NavLink>
                                {loggedInUser && loggedInUser.rol ? (
                                    <NavLink
                                        to="/dashboard/appointments"
                                        className={style.link}
                                        onClick={handleNavigation}
                                    >
                                        Dashboard
                                    </NavLink>
                                ) : user && user.rol === "admin" ? (
                                    <NavLink
                                        to="/dashboard/appointments"
                                        className={style.link}
                                        onClick={handleNavigation}
                                    >
                                        Dashboard
                                    </NavLink>
                                ) : (
                                    ""
                                )}
                            </Box>
                        )}
                    </Box>
                )}
                {isLoggedIn ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                            alignItems: "center",
                            minWidth: "10%",
                            paddingRight: "4rem",

                            ...(isSmallScreen && { paddingRight: "2rem" }),
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                    aria-controls={
                                        open ? "account-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                            width: 42,
                                            height: 42,
                                            backgroundColor: "palevioletred",
                                        }}
                                    >
                                        {firstLetter}
                                    </Avatar>
                                </IconButton>
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&::before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                            >
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        navigate("/profile");
                                        setIsOpen(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <PersonOutlineOutlinedIcon />
                                    </ListItemIcon>
                                    Profile
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        navigate("/profile/appointments");
                                        setIsOpen(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <EventOutlinedIcon />
                                    </ListItemIcon>
                                    Appointments
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        navigate("/profile/orders");
                                        setIsOpen(false);
                                    }}
                                >
                                    <ListItemIcon>
                                        <ShoppingBagOutlinedIcon />
                                    </ListItemIcon>
                                    Orders
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    onClick={() => {
                                        handleClose();
                                        handleLogout();
                                        setTimeout(() => {
                                            navigate("/login");
                                        }, 1000);
                                    }}
                                >
                                    <ListItemIcon>
                                        <Logout />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Button
                            sx={{
                                p: 0,
                                minWidth: 42,
                                height: 42,
                                borderRadius: 50,
                                color: "palevioletred",
                                border: "1px solid rgba(216, 112, 147)",

                                "&:hover": {
                                    backgroundColor:
                                        "rgba(216, 112, 147, 0.183)",
                                },
                            }}
                            onClick={() => {
                                navigate("/shoppingCart");
                                setIsOpen(false);
                            }}
                        >
                            <Tooltip
                                title={`Checkout products`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                <StyledBadge
                                    badgeContent={
                                        quantity < 11 ? quantity : "+10"
                                    }
                                    color="error"
                                    overlap="rectangular"
                                >
                                    <ShoppingCartOutlinedIcon
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </StyledBadge>
                            </Tooltip>
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            // paddingRight: "2rem",
                            minWidth: "100%",
                            display: "flex",
                            justifyContent: isPhone ? "center" : "flex-end",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                                paddingRight: !isPhone && "2rem",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/register");
                                }}
                                size={isSmallScreen ? "small" : "medium"}
                                sx={{
                                    minWidth: "fit-content",
                                    backgroundColor: "palevioletred",
                                    color: "rgb(255, 218, 230)",
                                    fontSize: "clamp(1px, 6vw, 1rem)",
                                    "&:hover": {
                                        backgroundColor: "palevioletred",
                                        color: "rgb(255, 218, 230)",
                                        opacity: "0.8",
                                    },
                                }}
                            >
                                Sign up
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/login");
                                }}
                                size={isSmallScreen ? "small" : "medium"}
                                sx={{
                                    minWidth: "fit-content",
                                    backgroundColor: "palevioletred",
                                    color: "rgb(255, 218, 230)",
                                    fontSize: "clamp(1px, 6vw, 1rem)",
                                    "&:hover": {
                                        backgroundColor: "palevioletred",
                                        color: "rgb(255, 218, 230)",
                                        opacity: "0.8",
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            {isOpen && isPhone && (
                <Box
                    // className={isOpen ? style.fadeIn : style.fadeOut}
                    className={isOpen && style.fadeIn}
                    sx={{
                        minWidth: "100%",
                        height: "1000px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        paddingTop: "50px",
                        gap: "10px",
                        backgroundColor: "rgb(255, 218, 230, 0.9)",
                        boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.218)",
                        position: "absolute",
                        zIndex: "100",
                        fontSize: "1.5rem",
                    }}
                >
                    <NavLink
                        to="/"
                        className={style.link}
                        onClick={handleNavigation}
                    >
                        Appointments
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={style.link}
                        onClick={handleNavigation}
                    >
                        Products
                    </NavLink>
                    {user && user.rol === "admin" && (
                        <NavLink
                            to="/dashboard/appointments"
                            className={style.link}
                            onClick={handleNavigation}
                        >
                            Dashboard
                        </NavLink>
                    )}
                </Box>
            )}
        </div>
    );
};

export default NavBar;
