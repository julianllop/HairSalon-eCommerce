import React, { useState } from "react";
import style from "./editProfile.module.css";
import {
    Modal,
    Box,
    Button,
    Typography,
    FormControl,
    TextField,
    Backdrop,
    Fade,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { checkPassword } from "../../redux/actions/userActions";
import { validate } from "./validatePassword";

const EditProfile = ({ setEditing, email }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const isSmallScreen = useMediaQuery("(max-width:400px)");
    const isMediumScreen = useMediaQuery("(max-width:730px)");

    const [form, setForm] = useState({
        password: "",
        passwordX2: "",
    });

    const [errors, setErrors] = useState({
        password: "",
        passwordX2: "",
    });

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "65%" : "35%",
        height: "300px",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        outline: "none",
    };

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        setErrors(
            validate({
                ...form,
                [property]: value,
            })
        );
    };

    const handleSubmit = async () => {
        const { password } = form;
        await dispatch(checkPassword({ email, password }))
            .then(setEditing(true))
            .then(handleClose())
            .then(
                setForm({
                    password: "",
                    passwordX2: "",
                })
            );
    };

    return (
        <Box>
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
                }}
                onClick={() => {
                    handleOpen();
                }}
            >
                <EditIcon />
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
                                sx={{
                                    // fontSize: "25px",
                                    fontWeight: "700",
                                    background:
                                        "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 218, 230)  100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",

                                    // ...(isSmallScreen && {
                                    //     fontSize: "20px",
                                    // }),
                                }}
                            >
                                Enter current password:
                            </Typography>
                            <FormControl
                                sx={{ minWidth: "50%" }}
                                variant="standard"
                            >
                                <TextField
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    type="password"
                                    label="Current password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleInputChange}
                                    sx={{
                                        minWidth: "50%",
                                        "& label.Mui-focused": {
                                            color: "rgb(165, 54, 91)",
                                        },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor:
                                                "rgb(165, 54, 91)",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                        },
                                    }}
                                />
                                {errors.password && (
                                    <Typography className={style.error}>
                                        {errors.password}
                                    </Typography>
                                )}
                            </FormControl>
                            <FormControl
                                sx={{ minWidth: "50%" }}
                                variant="standard"
                            >
                                <TextField
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    type="password"
                                    label="Confirm password"
                                    name="passwordX2"
                                    value={form.passwordX2}
                                    onChange={handleInputChange}
                                    sx={{
                                        minWidth: "50%",
                                        "& label.Mui-focused": {
                                            color: "rgb(165, 54, 91)",
                                        },
                                        "& .MuiInput-underline:after": {
                                            borderBottomColor:
                                                "rgb(165, 54, 91)",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "rgb(165, 54, 91)",
                                            },
                                        },
                                    }}
                                />
                                {errors.passwordX2 && (
                                    <Typography className={style.error}>
                                        {errors.passwordX2}
                                    </Typography>
                                )}
                            </FormControl>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                                minWidth: "100%",
                                gap: "40px",
                                marginTop: 3,
                                marginBottom: 1,
                            }}
                        >
                            <Box
                                sx={{
                                    // minWidth: "40%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "10px",
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
                                    onClick={handleSubmit}
                                >
                                    Ok
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default EditProfile;
