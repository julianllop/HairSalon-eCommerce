const {
    getAppointmentsFromDB,
    getUserAppointmentsFromDB,
    getNext7,
    createAppointmentInDB,
    updateAppointmentInDB,
    deleteAppointmentInDB,
    deleteAppointmentsInDB,
} = require("../functions/appointment.functions");

const getAppointments = async (req, res) => {
    try {
        const appointments = await getAppointmentsFromDB();
        res.status(201).json(appointments);
    } catch (error) {
        res.status(400).json({
            message: "Error getting all appointments",
            error: error.message,
        });
    }
};

const getUserAppointments = async (req, res) => {
    const { userId } = req.params;

    try {
        const appointments = await getUserAppointmentsFromDB(userId);
        res.status(201).json(appointments);
    } catch (error) {
        res.status(400).json({
            message: "Error getting all appointments",
            error: error.message,
        });
    }
};

const getNext7Appointments = async (req, res) => {
    const { id } = req.params;

    try {
        const appointments = await getNext7(id);
        res.status(201).json(appointments);
    } catch (error) {
        res.status(400).json({
            message: "Error getting next 7 appointment days",
            error: error.message,
        });
    }
};

const createAppointment = async (req, res) => {
    const { id, day, time, serviceType, username } = req.body;

    try {
        const newAppointment = await createAppointmentInDB(
            id,
            day,
            time,
            serviceType,
            username
        );

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({
            message: "Error at creating new appointment",
            error: error.message,
        });
    }
};

const updateAppointment = async (req, res) => {
    const { id, day, time, serviceType } = req.body;

    try {
        const updatedAppointment = await updateAppointmentInDB(
            id,
            day,
            time,
            serviceType
        );
        res.status(201).json(updatedAppointment);
    } catch (error) {
        res.status(400).json({
            message: "Error at updating appointment",
            error: error.message,
        });
    }
};

const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAppointment = await deleteAppointmentInDB(id);
        res.status(201).json(deletedAppointment);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting appointment",
            error: error.message,
        });
    }
};
const deleteAll = async (req, res) => {
    try {
        const deletedAppointments = await deleteAppointmentsInDB();
        res.status(201).json(deletedAppointments);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting appointment",
            error: error.message,
        });
    }
};

module.exports = {
    getAppointments,
    getUserAppointments,
    getNext7Appointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    deleteAll,
};
