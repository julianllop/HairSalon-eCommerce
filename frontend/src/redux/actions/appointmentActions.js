import axios from "axios";
import {
    SET_APPOINTMENT,
    UPDATE_APPOINTMENT,
    GET_APPOINTMENTS,
    GET_NEXT_7_APPOINTMENTS,
    DELETE_APPOINTMENT,
    GET_USER_APPOINTMENTS,
} from "../actionTypes/appointmentActionTypes";
import { parse, compareAsc } from "date-fns";
import dayjs, { Dayjs } from "dayjs";

// APOINTMENT ACTIONS
export const createAppointment = (payload) => {
    return async (dispatch) => {
        try {
            const createAppointment = await axios.post("/appointment", payload);
            const newAppointment = createAppointment.data;

            dispatch({
                type: SET_APPOINTMENT,
                payload: newAppointment,
            });
        } catch (error) {
            console.log("There was an error trying to logout (client)", error);
        }
    };
};

export const updateAppointment = (payload) => {
    return async (dispatch) => {
        try {
            if (!payload || typeof payload !== "object") {
                throw new Error("Invalid payload for updating appointment");
            }

            const updateData = await axios.put(`/appointment`, payload);
            const updatedAppointment = updateData.data;

            dispatch({
                type: UPDATE_APPOINTMENT,
                payload: updatedAppointment,
            });
        } catch (error) {
            console.log(
                "There was an error updating the appointment (client)",
                error
            );
            throw error;
        }
    };
};

const formateDate = (date, time) => {
    let [day, month, year] = date.split("-");

    const dateString = `${year}-${month}-${day}T${time}:00`;
    // console.log(dateString);

    const newDate = new Date(dateString);
    // console.log(newDate);
    return newDate;
};

export const getAppointments = () => {
    return async (dispatch) => {
        try {
            const appointmentsFromDB = await axios.get(`/appointment`);
            let allAppointments = appointmentsFromDB.data;

            // Ordenar por day y time usando una función de comparación personalizada
            allAppointments.sort((a, b) => {
                const dateA = formateDate(a.day, a.time);
                const dateB = formateDate(b.day, b.time);

                return compareAsc(dateA, dateB);
            });

            const currentDate = new Date();
            const filteredAppointments = allAppointments.filter(
                (appointment) => {
                    const appointmentDate = formateDate(
                        appointment.day,
                        appointment.time
                    );
                    return compareAsc(appointmentDate, currentDate) >= 0;
                }
            );

            return dispatch({
                type: GET_APPOINTMENTS,
                payload: filteredAppointments,
            });
        } catch (error) {
            console.log("Appointments not found (client): ", error);
        }
    };
};

export const getUserAppointments = (userId) => {
    return async (dispatch) => {
        try {
            const appointmentsFromDB = await axios.get(
                `/appointment/${userId}`
            );
            let allAppointments = appointmentsFromDB.data;

            // Ordenar por day y time usando una función de comparación personalizada
            allAppointments.sort((a, b) => {
                const dateA = formateDate(a.day, a.time);
                const dateB = formateDate(b.day, b.time);

                return compareAsc(dateA, dateB);
            });

            const currentDate = new Date();
            const filteredAppointments = allAppointments.filter(
                (appointment) => {
                    const appointmentDate = formateDate(
                        appointment.day,
                        appointment.time
                    );
                    return compareAsc(appointmentDate, currentDate) >= 0;
                }
            );

            return dispatch({
                type: GET_USER_APPOINTMENTS,
                payload: filteredAppointments,
            });
        } catch (error) {
            console.log("Appointments not found (client): ", error);
        }
    };
};

export const getNext7Appointments = (id) => {
    return async (dispatch) => {
        try {
            const appointmentsFromDB = await axios.get(`/appointment/${id}`);
            const all7Appointments = appointmentsFromDB.data;

            return dispatch({
                type: GET_NEXT_7_APPOINTMENTS,
                payload: all7Appointments,
            });
        } catch (error) {
            console.log("Appointments not found (client): ", error);
        }
    };
};

export const deleteAppointment = (id) => {
    return async (dispatch) => {
        try {
            const deleteData = await axios.delete(`/appointment/${id}`);
            const deletedAppointment = deleteData.data;

            dispatch({
                type: DELETE_APPOINTMENT,
                payload: deletedAppointment,
            });
        } catch (error) {
            console.log(
                "There was an error deleting appointment (client)",
                error
            );
        }
    };
};
