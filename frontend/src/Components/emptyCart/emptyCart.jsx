import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAppointment } from "../../redux/actions/appointmentActions";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import {
    clearCart,
    getCart,
    getCartQuantity,
} from "../../redux/actions/shoppingCartActions";

const EmptyCart = ({ userId, shoppingCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isSmallScreen = useMediaQuery("(max-width:450px)");
    const isMediumScreen = useMediaQuery("(max-width:550px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "60%" : "fit-content",
        height: "fit-content",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        outline: "none",
    };

    const handleSubmit = async (userId) => {
        await dispatch(clearCart(userId));
        await dispatch(getCart(userId));
        await dispatch(getCartQuantity(userId));
    };

    return (
        <Box sx={{ minWidth: "100%" }}>
            <Button
                color="error"
                variant="contained"
                onClick={handleOpen}
                disabled={!shoppingCart?.length}
                sx={{
                    minWidth: "90%",
                    height: "50px",
                    fontSize: "clamp(15px, 4vw, 1.2rem)",

                    ...(isSmallScreen && {
                        padding: 0,
                        height: "30px",
                    }),
                }}
            >
                Empty Cart
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "15px",
                            }}
                        >
                            <Typography
                                id="transition-modal-title"
                                variant="h4"
                                component="h2"
                                sx={{ fontSize: "clamp(15px, 4vw, 1.5rem)" }}
                            >
                                You will delete all the products in your
                                shopping cart
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h5"
                                component="h2"
                                sx={{ color: "rgb(0,0,0,0.7)",fontSize: "clamp(15px, 4vw, 1.2rem)" }}
                            >
                                Confirm this action please
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: "10px",
                                marginTop: "1.5rem"
                            }}
                        >
                            <Button
                                color="error"
                                variant="contained"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="success"
                                variant="contained"
                                onClick={() => {
                                    handleSubmit(userId);
                                    handleClose();
                                }}
                            >
                                Confirm
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default EmptyCart;
