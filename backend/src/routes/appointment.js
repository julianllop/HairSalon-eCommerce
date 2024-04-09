const { Router } = require("express");
const {
    getAppointments,
    getNext7Appointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    deleteAll,
} = require("../controllers/appointment.controller");

const appointmentRouter = Router();

appointmentRouter.get("/", getAppointments);

appointmentRouter.get("/:userId", getAppointments);

appointmentRouter.get("/:id", getNext7Appointments);

appointmentRouter.post("/", createAppointment);

appointmentRouter.put("/", updateAppointment);

appointmentRouter.delete("/", deleteAll);

appointmentRouter.delete("/:id", deleteAppointment);

module.exports = appointmentRouter;
