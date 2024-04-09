// Calendar.js
import React, { useCallback, useEffect, useState } from "react";
import style from "./calendar.module.css";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AppointmentModal from "../appointmentModal/appointmentModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserByToken } from "../../redux/actions/userActions";
import { getAppointments } from "../../redux/actions/appointmentActions";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import useMediaQuery from "@mui/material/useMediaQuery";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
    const dispatch = useDispatch();

    const appointments = useSelector((state) => state.appointments);
    const user = useSelector((state) => state.userByToken);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [userDataLoaded, setUserDataLoaded] = useState(false);

    const checkAuth = async () => {
        try {
            setTimeout(async () => {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                const decodedUser = await dispatch(getUserByToken(jwtCookie));
                return decodedUser;
            }, 100);
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    const memoizedGetAppointments = useCallback(async () => {
        try {
            await dispatch(getAppointments());
        } catch (error) {
            console.log("Error fetching appointments:", error);
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
            await memoizedGetAppointments();
            setUserDataLoaded(true);
        };

        fetchData();
    }, [memoizedGetAppointments]);

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day) => (
            <Box
                sx={{
                    minWidth: "14.3%",
                    fontSize: "clamp(1px, 5vw, 1.5rem)",
                    fontWeight: 500,
                    color: "rgb(97, 6, 36)",
                }}
                key={day}
            >
                {day}
            </Box>
        ));
    };

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();

        return `${day < 10 ? "0" : ""}${day}-${
            month < 10 ? "0" : ""
        }${month}-${year}`;
    };

    const renderDaysOfCurrentWeek = () => {
        const currentWeek = [];
        const today = new Date();

        const firstDayOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
        );

        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(
                firstDayOfWeek.getFullYear(),
                firstDayOfWeek.getMonth(),
                firstDayOfWeek.getDate() + i
            );

            const isToday =
                dayDate.getDate() === today.getDate() &&
                dayDate.getMonth() === today.getMonth() &&
                dayDate.getFullYear() === today.getFullYear();

            const dayKey = dayDate.toISOString();

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

            const isWeekend = (date) => {
                const dayOfWeek = date.getDay();
                return dayOfWeek === 0 || dayOfWeek === 6;
            };

            const appointmentModals =
                userDataLoaded &&
                appointmentTimes.map((time) => {
                    const appointmentKey = `${formatDate(dayKey)}-${time}`;
                    const isAppointmentAvailable = appointments.some(
                        (appointment) =>
                            appointment.day === formatDate(dayKey) &&
                            appointment.time === time
                    );

                    const appointmentDateTime = new Date(
                        dayDate.getFullYear(),
                        dayDate.getMonth(),
                        dayDate.getDate(),
                        parseInt(time.split(":")[0]),
                        parseInt(time.split(":")[1])
                    );

                    const isPastTime = today > appointmentDateTime;

                    return (
                        <div key={appointmentKey} className={style.appointment}>
                            <AppointmentModal
                                currentDay={formatDate(dayKey)}
                                userId={user.id}
                                username={user.username}
                                time={time}
                                isAppointmentAvailable={isAppointmentAvailable}
                                isWeekend={isWeekend(dayDate)}
                                isDayPassed={isPastTime}
                                isPastTime={isPastTime}
                            />
                        </div>
                    );
                });

            currentWeek.push(
                <div
                    key={dayDate.toISOString()}
                    className={`${style.dayContainer} ${
                        dayDate.getMonth() !== currentDate.getMonth()
                            ? style.nextMonth
                            : ""
                    }`}
                >
                    <div className={isToday ? style.today : style.day}>
                        <Typography
                            variant="h1"
                            sx={{
                                cursor: "default",
                                color: "rgb(165, 54, 91)",
                                margin: 0,
                                padding: 0,
                                height: "25px",
                                // width: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontWeight: "700",
                                fontSize: "clamp(1px, 5vw, 1.5rem)",
                            }}
                        >
                            {dayDate.getDate()}
                        </Typography>
                    </div>
                    <div className={style.appointments}>
                        {appointmentModals}
                    </div>
                </div>
            );
        }

        return currentWeek;
    };

    const renderHeader = () => {
        const firstDayOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - currentDate.getDay()
        );
        const lastDayOfWeek = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + (6 - currentDate.getDay())
        );

        const options = { month: "long", year: "numeric" };
        const startMonth = firstDayOfWeek.toLocaleDateString("en-US", options);
        const endMonth = lastDayOfWeek.toLocaleDateString("en-US", options);

        if (firstDayOfWeek.getMonth() === lastDayOfWeek.getMonth()) {
            // Si todos los días de la semana pertenecen al mismo mes
            const monthAndYear = startMonth;
            return (
                <Typography
                    sx={{
                        padding: 0,
                        margin: 0,
                        color: "palevioletred",
                        minWidth: "33.3333%",
                        fontSize: "clamp(1px, 7vw, 2.5rem)",
                        fontWeight: 700,
                    }}
                >{`${monthAndYear}`}</Typography>
            );
        } else if (
            firstDayOfWeek.getFullYear() === lastDayOfWeek.getFullYear() &&
            firstDayOfWeek.getMonth() !== 11 &&
            lastDayOfWeek.getMonth() !== 0
        ) {
            // Si la semana abarca dos meses distintos del mismo año (excluyendo diciembre y enero)
            return (
                <Typography
                    sx={{
                        padding: 0,
                        margin: 0,
                        color: "palevioletred",
                        minWidth: "33.3333%",
                        fontSize: "clamp(1px, 7vw, 2.5rem)",
                        fontWeight: 700,
                    }}
                >{`${startMonth.split(" ")[0]} - ${endMonth.split(" ")[0]} ${
                    endMonth.split(" ")[1]
                }`}</Typography>
            );
        } else {
            // Para todos los demás casos
            return (
                <Typography
                    sx={{
                        padding: 0,
                        margin: 0,
                        color: "palevioletred",
                        minWidth: "33.3333%",
                        fontSize: "clamp(1px, 7vw, 2.5rem)",
                        fontWeight: 700,
                    }}
                >{`${startMonth} - ${endMonth}`}</Typography>
            );
        }
    };

    const goToPreviousWeek = () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - 7
        );

        // Verificar si la nueva fecha es en el pasado
        if (newDate >= new Date()) {
            setCurrentDate(newDate);
        } else {
            // Si la nueva fecha es en el pasado, establecer la fecha actual
            setCurrentDate(new Date());
        }
    };

    const goToNextWeek = () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() + 7
        );

        setCurrentDate(newDate);
    };
    const goToCurrentWeek = () => {
        setCurrentDate(new Date());
    };

    const isSmallScreen = useMediaQuery("(max-width:800px)");

    return (
        <div className={style.calendarContainer}>
            <Typography
                sx={{
                    background:
                        "linear-gradient(90deg, rgb(165, 54, 91) 0%, rgb(255, 193, 212)  100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "clamp(1px, 7.5vw, 3rem)",
                    fontWeight: 700,
                }}
            >
                Choose an Appointment
            </Typography>
            {isSmallScreen ? (
                <Box
                    sx={{
                        minWidth: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        margin: "5px",
                    }}
                >
                    {renderHeader()}
                    <Box
                        sx={{
                            minWidth: "33.3333%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            margin: "5px",
                        }}
                    >
                        <Button
                            className={style.button}
                            onClick={goToPreviousWeek}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "50px",
                                height: "50px",

                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <ArrowBackIosNewIcon
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "clamp(1px, 7.5vw, 1rem)",
                                }}
                            />
                        </Button>
                        <Button
                            onClick={goToCurrentWeek}
                            className={style.button}
                            sx={{
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "fit-content",
                                height: "50px",
                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    // minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: "0px 15px",
                                    fontSize: "clamp(1px, 4vw, 1rem)",
                                    fontWeight: "700",
                                }}
                            >
                                Current
                            </Typography>
                        </Button>
                        <Button
                            className={style.button}
                            onClick={goToNextWeek}
                            sx={{
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "50px",
                                height: "50px",
                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <ArrowForwardIosIcon
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "clamp(1px, 7.5vw, 1rem)",
                                }}
                            />
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            minWidth: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#2e7d32",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                AVAILABLE
                            </Typography>
                            <EventAvailableIcon
                                color="success"
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#d32f2f",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                NOT AVAILABLE
                            </Typography>
                            <EventBusyIcon
                                color="error"
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "rgb(94, 94, 94)",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                CLOSED
                            </Typography>
                            <EventBusyIcon
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                    color: "rgb(94, 94, 94)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        minWidth: "90%",
                        marginBottom: "10px",
                    }}
                >
                    <Box
                        sx={{
                            minWidth: "33.3333%",
                            display: "flex",
                            // justifyContent: "center",
                            gap: "10px",
                        }}
                    >
                        <Button
                            className={style.button}
                            onClick={goToPreviousWeek}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "50px",
                                height: "50px",

                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <ArrowBackIosNewIcon
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "clamp(1px, 7.5vw, 1rem)",
                                }}
                            />
                        </Button>
                        <Button
                            onClick={goToCurrentWeek}
                            className={style.button}
                            sx={{
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "fit-content",
                                height: "50px",
                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    // minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <Typography
                                sx={{
                                    padding: "0px 15px",
                                    fontSize: "clamp(1px, 4vw, 1rem)",
                                    fontWeight: "700",
                                }}
                            >
                                Current
                            </Typography>
                        </Button>
                        <Button
                            className={style.button}
                            onClick={goToNextWeek}
                            sx={{
                                color: "palevioletred",
                                backgroundColor: "rgb(255, 218, 230)",
                                borderRadius: "50px",
                                minWidth: "50px",
                                height: "50px",
                                "&:hover": {
                                    color: "palevioletred",
                                    backgroundColor: "rgb(255, 218, 230)",
                                    opacity: "0.8",
                                },

                                ...(isSmallScreen && {
                                    minWidth: "30px",
                                    height: "30px",
                                }),
                            }}
                        >
                            <ArrowForwardIosIcon
                                sx={{
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "clamp(1px, 7.5vw, 1rem)",
                                }}
                            />
                        </Button>
                    </Box>
                    <Typography
                        sx={{
                            padding: 0,
                            margin: 0,
                            color: "palevioletred",
                            minWidth: "33.3333%",
                            fontSize: "clamp(1px, 4vw, 1.2rem)",
                        }}
                    >
                        {renderHeader()}
                    </Typography>
                    <Box
                        sx={{
                            minWidth: "33.3333%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "flex-end",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#2e7d32",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                AVAILABLE
                            </Typography>
                            <EventAvailableIcon
                                color="success"
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#d32f2f",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                NOT AVAILABLE
                            </Typography>
                            <EventBusyIcon
                                color="error"
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "rgb(94, 94, 94)",
                                    borderRadius: "10px",
                                    "&:hover": {
                                        cursor: "default",
                                    },
                                    border: "none",
                                    display: "flex",
                                    justifyContent: "center ",
                                    alignItems: "center",
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 3vw, 0.9rem)",
                                    fontWeight: "700",
                                }}
                            >
                                CLOSED
                            </Typography>
                            <EventBusyIcon
                                sx={{
                                    margin: 0,
                                    padding: 0,
                                    fontSize: "clamp(1px, 4vw, 1.8rem)",
                                    color: "rgb(94, 94, 94)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            )}

            <section className={style.calendar}>
                <div className={style.daysOfWeek}>{renderDaysOfWeek()}</div>
                <div className={style.daysOfCurrentWeek}>
                    {renderDaysOfCurrentWeek()}
                </div>
            </section>
        </div>
    );
};

export default Calendar;
