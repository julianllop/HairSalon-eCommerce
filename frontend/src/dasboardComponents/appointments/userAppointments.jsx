import React, { useCallback, useEffect, useState } from "react";
import { getAppointments } from "../../redux/actions/appointmentActions";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import style from "./userAppointments.module.css";
import EditIcon from "@mui/icons-material/Edit";
import EditAppointment from "../editAppointment/editAppointment";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

const UserAppointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const appointments = useSelector((state) => state.appointments);

    const isSmallScreen = useMediaQuery("(max-width:420px)");

    useEffect(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const updateAppointments = useCallback(() => {
        dispatch(getAppointments());
    }, [dispatch]);

    const isPastDate = (date) => {
        const today = dayjs();
        const appointmentDate = dayjs(date);
        return appointmentDate.isBefore(today, "day");
    };

    return (
        <Box
            sx={{
                minWidth: "100%",
                height: "94vh",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 5,
            }}
        >
            <Typography
                sx={{
                    background:
                        "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 193, 212)  100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1px, 6vw, 3rem)",
                    fontWeight: 700,
                    marginBottom: "20px",
                }}
            >
                Manage your appointments
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
                {Array.isArray(appointments) &&
                    (appointments.length > 0 ? (
                        appointments?.map((appointment) => (
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
                                            fontSize:
                                                "clamp(10px, 4vw, 1.2rem)",
                                            color: isPastDate(appointment.day)
                                                ? "#797979"
                                                : "rgb(165, 54, 91)",
                                        }}
                                    >
                                        {appointment.serviceType}
                                    </Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        // minWidth: "25%",
                                        fontSize: "clamp(10px, 4vw, 1.2rem)",
                                        color: isPastDate(appointment.day)
                                            ? "#797979"
                                            : "rgb(165, 54, 91)",
                                    }}
                                >
                                    {appointment.username}
                                </Typography>

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
                        ))
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minWidth: "100%",
                                height: "100%",
                                // backgroundColor: "#e3e3e35b",
                            }}
                        >
                            <Typography
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "3rem",
                                    fontWeight: "700",
                                    color: "gray",
                                    minWidth: "40%",
                                    height: "15%",
                                    borderRadius: "10px",
                                    backgroundColor: "#cacaca5b",
                                }}
                            >
                                No appointments to show
                            </Typography>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default UserAppointments;
