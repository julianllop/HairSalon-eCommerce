require("dotenv").config();
const { Appointment } = require("../db");

const getAppointmentsFromDB = async () => {
    const appointments = await Appointment.findAll();
    return appointments;
};

const getUserAppointmentsFromDB = async (userId) => {
    const userAppointments = await Appointment.findAll({
        where: {
            userId,
        },
    });

    return userAppointments;
};

const getNext7 = async (id) => {
    // const appointments = await Appointment.findAll();
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
        return null;
    }

    const currentDay = new Date(
        appointment.day.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    const next7Days = [];

    for (let i = 1; i <= 7; i++) {
        const nextDay = new Date(currentDay);
        nextDay.setDate(currentDay.getDate() + i);

        // Verificar si el próximo día es sábado o domingo y omitirlos
        if (nextDay.getDay() !== 0 && nextDay.getDay() !== 6) {
            // Formatear la fecha como "DD-MM-YYYY"
            const formattedDate = `${String(nextDay.getDate()).padStart(
                2,
                "0"
            )}-${String(nextDay.getMonth() + 1).padStart(
                2,
                "0"
            )}-${nextDay.getFullYear()}`;
            next7Days.push(formattedDate);
        }
    }

    console.log(next7Days);

    return next7Days;
};

const createAppointmentInDB = async (
    userId,
    day,
    time,
    serviceType,
    username
) => {
    const newAppointment = await Appointment.create({
        userId,
        day,
        time,
        serviceType,
        username,
    });

    return newAppointment;
};

const updateAppointmentInDB = async (id, day, time, serviceType) => {
    const updatedAppointment = await Appointment.findByPk(id);

    if (!updatedAppointment) throw Error("Appointment not found!");

    updatedAppointment.day = day;
    updatedAppointment.time = time;
    updatedAppointment.serviceType = serviceType;

    await updatedAppointment.save();

    return updatedAppointment;
};

const deleteAppointmentInDB = async (id) => {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
        throw new Error("Appointment not found");
    }

    await appointment.destroy();
};

const deleteAppointmentsInDB = async () => {
    const deletedAppointments = await Appointment.destroy({
        where: {},
        truncate: true,
    });

    return deletedAppointments;
};

module.exports = {
    getAppointmentsFromDB,
    getUserAppointmentsFromDB,
    getNext7,
    createAppointmentInDB,
    updateAppointmentInDB,
    deleteAppointmentInDB,
    deleteAppointmentsInDB,
};
