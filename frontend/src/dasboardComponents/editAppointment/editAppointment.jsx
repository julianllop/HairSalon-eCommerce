import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import styles from "./editAppointment.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    createAppointment,
    getNext7Appointments,
    updateAppointment,
} from "../../redux/actions/appointmentActions";
import EditIcon from "@mui/icons-material/Edit";
import DatePickerValue from "../../Components/datePicker/datePickerValue";
import dayjs from "dayjs";

const EditAppointment = ({
    id,
    day,
    time,
    serviceType,
    userId,
    appointments,
    updateAppointments,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [appointment, setAppointment] = useState({
        id: id,
        day: day,
        time: time,
        serviceType: serviceType,
    });

    const [occupiedTimes, setOccupiedTimes] = useState([]);

    useEffect(() => {
        // Filtra los appointments para obtener solo los del día seleccionado
        const appointmentsOnSelectedDay = appointments.filter(
            (app) => app.day === appointment.day
        );

        // Obtiene las horas ocupadas en el día seleccionado
        const occupiedTimesOnSelectedDay = appointmentsOnSelectedDay.map(
            (app) => app.time
        );

        setOccupiedTimes(occupiedTimesOnSelectedDay);
    }, [appointment.day, appointments]);

    const isPastDay = () => {
        const today = dayjs(); // Obtener el día actual
        const appointmentDayObject = dayjs(day); // Convertir el día del appointment a un objeto de dayjs

        // Comparar si el día del appointment es anterior al día actual
        return appointmentDayObject.isBefore(today, "day");
    };

    const appointmentTimes = [
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
    ];

    const isSmallScreen = useMediaQuery("(max-width:450px)");
    const isMediumScreen = useMediaQuery("(max-width:1000px)");

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transform: "translate(-50%, -50%)",
        width: isMediumScreen ? "60%" : "40%",
        height: "fit-content",
        borderRadius: "10px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
        outline: "none",
    };

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        "label + &": {
            marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            border: "2px solid rgb(165, 54, 91)",
            fontSize: 16,
            minWidth: 500,
            padding: "10px 26px 10px 12px",
            transition: theme.transitions.create([
                "border-color",
                "box-shadow",
            ]),
            fontFamily: [
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
            "&:focus": {
                borderRadius: 4,
            },
            "& .MuiInputLabel-root": {
                color: "palevioletred",
            },
        },
    }));

    const handleSelectDay = (date) => {
        if (date) {
            setAppointment((prevAppointment) => ({
                ...prevAppointment,
                day: date,
            }));
        }
    };

    const handleSelectTime = (event) => {
        const selectedTime = event.target.value;

        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            time: selectedTime,
        }));
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

        const { id, day, time, serviceType } = appointment;

        if (id && day && time && serviceType) {
            try {
                dispatch(
                    updateAppointment({ id, day, time, serviceType })
                ).then(() => {
                    alert(
                        `Appointment updated successfully. You have an appointment for ${serviceType} on ${day} at ${time}.`
                    );
                    handleClose();
                    updateAppointments();
                });
            } catch (error) {
                alert("Something went wrong. Try again later.");
                console.error("Error updating the appointment:", error);
            }
        }
    };

    return (
        <Box>
            <Button
                disabled={isPastDay()}
                sx={{
                    minWidth: 20,
                    backgroundColor: isPastDay() ? "#aeaeae" : "#1976D2",
                    color: "white",
                    borderRadius: "10px",
                    "&:hover": {
                        color: "#1976D2",
                    },
                    border: isPastDay()
                        ? "1px solid #aeaeae"
                        : "1px solid #1976D2",

                    ...(isSmallScreen && {
                        padding: "5px",

                        minWidth: "30px",
                        height: "30px",
                    }),
                }}
                onClick={() => {
                    handleOpen();
                    dispatch(getNext7Appointments(id));
                }}
            >
                <EditIcon
                    sx={{
                        color: "white",
                        ...(isSmallScreen && {
                            fontSize: "15px",
                        }),
                    }}
                />
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
                                    fontSize: "clamp(1px, 5vw, 2.5rem)",

                                    // ...(isSmallScreen && {
                                    //     fontSize: "20px",
                                    // }),
                                }}
                            >
                                Update appointment
                            </Typography>
                            <DatePickerValue
                                day={day}
                                setAppointment={setAppointment}
                                appointment={appointment}
                                // setDate={setDate}
                                handleSelectDay={handleSelectDay}
                            />
                            <FormControl
                                sx={{ minWidth: "50%" }}
                                variant="standard"
                            >
                                <TextField
                                    labelId="time"
                                    id="time"
                                    select
                                    label="Time"
                                    onChange={handleSelectTime}
                                    value={appointment.time}
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
                                >
                                    {appointmentTimes.map((time, index) => (
                                        <MenuItem
                                            key={index}
                                            value={time}
                                            disabled={occupiedTimes.includes(
                                                time
                                            )}
                                        >
                                            {time}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </FormControl>
                            <FormControl
                                sx={{ minWidth: "50%" }}
                                variant="standard"
                            >
                                <TextField
                                    labelId="serviceType"
                                    id="serviceType"
                                    select
                                    label="Service type"
                                    onChange={handleSelectService}
                                    value={appointment.serviceType}
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
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default EditAppointment;
