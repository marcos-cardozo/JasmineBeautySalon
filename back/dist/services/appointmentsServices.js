"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointmentServices = exports.scheduleAppointmentServices = exports.getAppointmentByIdServices = exports.getAppointmentsServices = void 0;
const IAppointments_1 = require("../interfaces/IAppointments");
const appointmentsList = [];
let id = 1;
const getAppointmentsServices = () => {
    return appointmentsList;
};
exports.getAppointmentsServices = getAppointmentsServices;
const getAppointmentByIdServices = (id) => {
    const appointmentWanted = appointmentsList.find(appointment => appointment.id === id);
    if (appointmentWanted) {
        return appointmentWanted;
    }
    else {
        throw new Error("No se pudo encontrar la cita");
    }
};
exports.getAppointmentByIdServices = getAppointmentByIdServices;
const scheduleAppointmentServices = (appointmentData) => {
    const newAppointment = {
        id,
        date: appointmentData.date,
        time: appointmentData.time,
        userId: appointmentData.userId,
        status: IAppointments_1.StatusAppointment.Active
    };
    appointmentsList.push(newAppointment);
    id++;
    return newAppointment;
};
exports.scheduleAppointmentServices = scheduleAppointmentServices;
const cancelAppointmentServices = (id) => {
    const appointmentWanted = appointmentsList.find(appointment => appointment.id === id);
    if (appointmentWanted) {
        appointmentWanted.status = IAppointments_1.StatusAppointment.Cancelled;
    }
    else {
        throw new Error("cita no encontrada, intente con otro Id");
    }
};
exports.cancelAppointmentServices = cancelAppointmentServices;
