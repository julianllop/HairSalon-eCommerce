import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import styles from "./appointmentModal.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAppointment, getAppointments } from "../../redux/actions/appointmentActions";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const AppointmentModal = ({
    time,
    currentDay,
    userId,
    username,
    isAppointmentAvailable,
    isWeekend,
    isDayPassed,
    isPastTime,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [appointment, setAppointment] = useState({
        id: userId,
        day: currentDay,
        time: time,
        serviceType: "",
        username: username,
    });

    const isSmallScreen = useMediaQuery("(max-width:730px)");
    const isMediumScreen = useMediaQuery("(max-width:550px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "10px",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "60%" : "30%",
        height: "320px",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 3,
        outline: "none",
    };

    const handleSelectService = (event) => {
        const selectedService = event.target.value;

        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            serviceType: selectedService,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { id, day, time, serviceType, username } = appointment;

        if (id && day && time && serviceType && username) {
            try {
                const newAppointment = dispatch(
                    createAppointment({ id, day, time, serviceType, username })
                );

                if (newAppointment) {
                    alert(
                        `Appointment createt successfully. You have an appointment for ${serviceType} on ${day} at ${time}.`
                    );
                    handleClose();
                    dispatch(getAppointments());
                }
            } catch (error) {
                alert("Something went wrong. Try again later.");
                console.error("Error setting the appointment:", error);
            }
        }
    };

    return (
        <Box
            sx={{
                margin: "0px 5px",
                minWidth: "80%",
                height: "80%",
                backgroundColor: isAppointmentAvailable
                    ? "#d32f2f2a"
                    : isWeekend
                    ? "rgba(94, 94, 94, 0.223)"
                    : isDayPassed || isPastTime
                    ? "#d32f2f2a"
                    : "#2e7d3233",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Button
                onClick={handleOpen}
                disabled={
                    isAppointmentAvailable ||
                    isWeekend ||
                    isPastTime ||
                    isDayPassed
                }
                sx={{
                    minWidth: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: isSmallScreen ? "column" : "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    color: isAppointmentAvailable
                        ? "#d32f2f2a"
                        : isWeekend
                        ? "rgba(94, 94, 94, 0.223)"
                        : isDayPassed || isPastTime
                        ? "#d32f2f2a"
                        : "#2e7d3233",

                    "&:hover": {
                        backgroundColor: "#2e7d3233",
                    },
                }}
            >
                <Typography
                    sx={{
                        color: isAppointmentAvailable
                            ? "#d32f2f"
                            : isWeekend
                            ? "rgb(94, 94, 94)"
                            : isDayPassed || isPastTime
                            ? "#d32f2f"
                            : "#2e7d32",
                        borderRadius: "10px",
                        "&:hover": {
                            cursor: "pointer",
                        },
                        border: "none",
                        display: "flex",
                        justifyContent: "center ",
                        alignItems: "center",
                        margin: 0,
                        padding: 0,
                        fontSize: "clamp(1px, 3.5vw, 1rem)",
                        fontWeight: 700,

                        // ...(isMediumScreen && {
                        //     fontSize: "0.9rem",
                        // }),
                    }}
                >
                    {time}
                </Typography>
                {isAppointmentAvailable ? (
                    <EventBusyIcon
                        color="error"
                        sx={{
                            margin: 0,
                            padding: 0,
                            fontSize: "clamp(1px, 5vw, 2rem)",
                        }}
                    />
                ) : isWeekend ? (
                    <EventBusyIcon
                        sx={{
                            margin: 0,
                            padding: 0,
                            fontSize: "clamp(1px, 5vw, 2rem)",
                            color: "rgb(94, 94, 94)",
                        }}
                    />
                ) : isDayPassed || isPastTime ? (
                    <EventBusyIcon
                        color="error"
                        sx={{
                            margin: 0,
                            padding: 0,
                            fontSize: "clamp(1px, 5vw, 2rem)",
                        }}
                    />
                ) : (
                    <EventAvailableIcon
                        color="success"
                        sx={{
                            margin: 0,
                            padding: 0,
                            fontSize: "clamp(1px, 5vw, 2rem)",
                        }}
                    />
                )}
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
                                variant="h1"
                                // component="h1"
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
                                Set your Appointment
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                                }}
                            >
                                Appointment for{" "}
                                <span className={styles.span}>
                                    {currentDay}
                                </span>{" "}
                                at <span className={styles.span}>{time}</span>
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "clamp(1rem, 2vw, 1.25rem)",
                                }}
                            >
                                <span className={styles.span}>{username}</span>{" "}
                                choose what service you want
                            </Typography>
                        </Box>

                        <FormControl
                            sx={{ minWidth: "80%" }}
                            variant="standard"
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                    minWidth: "100%",
                                    gap: "20px",
                                    // marginTop: 3,
                                    // marginBottom: 1,
                                }}
                            >
                                <TextField
                                    labelid="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    // autowidth
                                    label="Service type"
                                    select
                                    name="serviceType"
                                    onChange={handleSelectService}
                                    value={appointment.serviceType}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        minWidth: "100%",
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
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"Cut"}>Cut</MenuItem>
                                    <MenuItem value={"Nutrition"}>
                                        Nutrition
                                    </MenuItem>
                                    <MenuItem value={"Color"}>Color</MenuItem>
                                    <MenuItem value={"Scalp Massage"}>
                                        Scalp Massage
                                    </MenuItem>
                                </TextField>

                                <Box
                                    sx={{
                                        minWidth: "100%",
                                        display: "flex",
                                        justifyContent: "flex-end",
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
                        </FormControl>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default AppointmentModal;
