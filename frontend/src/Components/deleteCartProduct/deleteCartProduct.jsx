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
    getCartQuantity,
    removeFromCart,
} from "../../redux/actions/shoppingCartActions";

const DeleteCartProduct = ({ title, quantity, productId, userId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isSmallScreen = useMediaQuery("(max-width:400px)");
    const isMediumScreen = useMediaQuery("(max-width:710px)");

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

    const handleSubmit = async (productId, userId) => {
        await dispatch(removeFromCart(productId, userId));
        await dispatch(getCartQuantity(userId));
    };

    return (
        <Box sx={{}}>
            <Button
                onClick={handleOpen}
                sx={{
                    padding: 0,
                    minWidth: "fit-content",
                    backgroundColor: "transparent",
                    fontSize: "clamp(10px, 4vw, 0.9rem)",
                    "&:hover": {
                        backgroundColor: "transparent",
                    },
                }}
            >
                Delete
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
                                This item will be removed from your shopping
                                cart
                            </Typography>
                            <Typography
                                id="transition-modal-title"
                                variant="h5"
                                component="span"
                                sx={{
                                    display: "flex",
                                    gap: "5px",
                                    color: "rgb(0,0,0,0.7)",
                                    fontSize: "clamp(15px, 4vw, 1.2rem)",
                                }}
                            >
                                Do you want to remove {title}({quantity}) ?
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: "10px",
                                paddingTop: "1.5rem",
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
                                    handleSubmit(productId, userId);
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

export default DeleteCartProduct;
