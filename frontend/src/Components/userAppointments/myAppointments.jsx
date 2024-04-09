import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../../redux/actions/userActions";
import {
    getAppointments,
    getUserAppointments,
} from "../../redux/actions/appointmentActions";
import { Box, Typography, useMediaQuery } from "@mui/material";
import EditAppointment from "../../dasboardComponents/editAppointment/editAppointment";
import dayjs, { Dayjs } from "dayjs";

const MyAppointments = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.userByToken);
    const appointments = useSelector((state) => state.userAppointments);
    const today = dayjs();

    const isSmallScreen = useMediaQuery("(max-width:420px)");

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                return decodedUser;
            }, 10);
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    const updateAppointments = useCallback(() => {
        dispatch(getUserAppointments(user.id));
    }, [dispatch, user.id]);

    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
            dispatch(getUserAppointments(user.id));
        };

        fetchData();
    }, [dispatch, user.id]);

    const isPastDate = (date) => {
        const today = dayjs();
        const appointmentDate = dayjs(date);
        console.log(today);
        if (date) {
            console.log(appointmentDate);
        }

        return appointmentDate.isBefore(today, "day");
    };

    return (
        <Box
            sx={{
                minWidth: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 10,
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
                My appointments
            </Typography>
            <Box
                sx={{
                    minWidth: "30%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "column",
                    boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                    padding: "2rem",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    borderRadius: "10px",
                    gap: "15px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "500px",
                    maxHeight: "500px",
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

                    ...(isSmallScreen && {
                        padding: "1rem",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        // minWidth: "20%"
                    }),
                }}
            >
                {appointments &&
                    appointments.map((appointment) => (
                        <Box
                            key={appointment.id}
                            sx={{
                                minWidth: "100%",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "1rem",
                                borderRadius: "10px",
                                boxShadow:
                                    "0px 2px 10px 0px rgba(0, 0, 0, 0.114)",
                                // gap: "15px",
                                backgroundColor: "white",
                                opacity: isPastDate(appointment.day)
                                    ? "0.6"
                                    : "1",

                                ...(isSmallScreen && {
                                    padding: "0.5rem",
                                }),
                            }}
                        >
                            <Typography
                                sx={{
                                    // minWidth: "25%",
                                    fontSize: "clamp(10px, 4vw, 1.2rem)",
                                    color: isPastDate(appointment.day)
                                        ? "#797979"
                                        : "rgb(165, 54, 91)",
                                }}
                            >
                                {appointment.day}
                            </Typography>
                            <Typography
                                sx={{
                                    // minWidth: "25%",
                                    fontSize: "clamp(10px, 4vw, 1.2rem)",
                                    color: isPastDate(appointment.day)
                                        ? "#797979"
                                        : "rgb(165, 54, 91)",
                                }}
                            >
                                {appointment.time}
                            </Typography>
                            <Box sx={{ minWidth: "25%" }}>
                                <Typography
                                    sx={{
                                        textAlign: "left",
                                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                                        color: isPastDate(appointment.day)
                                            ? "#797979"
                                            : "rgb(165, 54, 91)",
                                    }}
                                >
                                    {appointment.serviceType}
                                </Typography>
                            </Box>

                            <EditAppointment
                                id={appointment.id}
                                day={appointment.day}
                                time={appointment.time}
                                serviceType={appointment.serviceType}
                                userId={appointment.userId}
                                appointments={appointments}
                                updateAppointments={updateAppointments}
                            />
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default MyAppointments;
