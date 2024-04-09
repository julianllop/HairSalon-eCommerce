import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const DatePickerValue = ({
    day,
    handleSelectDay,
    setAppointment,
    appointment,
}) => {
    const [value, setValue] = useState(null);

    // Analizar la fecha recibida como prop cuando cambia
    useEffect(() => {
        if (day) {
            const parsedDate = dayjs(day, "DD-M-YYYY");
            console.log(parsedDate);
            setValue(parsedDate);
        }
    }, [day]);

    const isWeekend = (date) => {
        const dayOfWeek = date.day();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const isPastDate = (date) => {
        const today = dayjs();
        return date.isBefore(today, "day");
    };

    const shouldDisableDate = (date) => {
        return isWeekend(date) || isPastDate(date);
    };

    const handleDateChange = (newValue) => {
        const date = newValue.$d;

        const newDate = dayjs(date).format("DD-MM-YYYY");

        setValue(newValue);
        handleSelectDay(newDate);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="DD-MM-YYYY"
                label="Day"
                name="day"
                value={value}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
                sx={{
                    minWidth: "100%",
                    "& label.Mui-focused": {
                        color: "rgb(165, 54, 91)",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottomColor: "rgb(165, 54, 91)",
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
        </LocalizationProvider>
    );
};

export default DatePickerValue;
