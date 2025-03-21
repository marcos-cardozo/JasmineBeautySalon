"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentsController_1 = require("../controllers/appointmentsController");
const appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.get("/", (req, res) => (0, appointmentsController_1.getAppointmentsController)(req, res));
appointmentsRouter.get("/:id", (req, res) => (0, appointmentsController_1.getAppointmentsByIdController)(req, res));
appointmentsRouter.post("/schedule", (req, res) => (0, appointmentsController_1.scheduleAppointmentController)(req, res));
appointmentsRouter.put("/cancel/:id", (req, res) => (0, appointmentsController_1.cancelAppointmentController)(req, res));
exports.default = appointmentsRouter;
