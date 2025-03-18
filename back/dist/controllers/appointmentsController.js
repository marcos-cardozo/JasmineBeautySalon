"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentController = exports.scheduleAppointmentController = exports.getAppointmentsByIdController = exports.getAppointmentsController = void 0;
const appointmentsServices_1 = require("../services/appointmentsServices");
const getAppointmentsController = (req, res) => {
    const services = (0, appointmentsServices_1.getAppointmentsServices)();
    res.status(200).json({
        message: "Obtuviste la informacion de todo el listado de todos las citas",
        data: services
    });
};
exports.getAppointmentsController = getAppointmentsController;
const getAppointmentsByIdController = (req, res) => {
    const { id } = req.params;
    const services = (0, appointmentsServices_1.getAppointmentByIdServices)(parseInt(id));
    res.status(200).json({
        message: `Obtuviste la informacion de la cita numero ${id}`,
        data: services
    });
};
exports.getAppointmentsByIdController = getAppointmentsByIdController;
const scheduleAppointmentController = (req, res) => {
    const service = (0, appointmentsServices_1.scheduleAppointmentServices)(req.body);
    res.status(200).json({
        message: "Agendaste el turno con éxito",
        data: service
    });
};
exports.scheduleAppointmentController = scheduleAppointmentController;
const cancelAppointmentController = (req, res) => {
    const { id } = req.params;
    // const services = cancelAppointmentServices(parseInt(id))
    res.status(200).json({
        message: `Cancelaste la cita numero ${id}`,
    });
};
exports.cancelAppointmentController = cancelAppointmentController;
