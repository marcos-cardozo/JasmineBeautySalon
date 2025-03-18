"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserController = exports.registerUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const userServices_1 = require("../services/userServices");
const getUsersController = (req, res) => {
    const service = (0, userServices_1.getUsersServices)();
    res.status(200).json({
        message: "Obtuviste la informacion de todo el listado de usuarios",
        data: service
    });
};
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => {
    const { id } = req.params;
    const service = (0, userServices_1.getUserByIdServices)(parseInt(id));
    res.status(200).json({
        message: `Obtuviste la informacion del usuario numero ${id}`,
        data: service
    });
};
exports.getUserByIdController = getUserByIdController;
const registerUserController = (req, res) => {
    (0, userServices_1.registerUserServices)(req.body);
    res.status(200).json({
        message: "Te registraste con exito"
    });
};
exports.registerUserController = registerUserController;
const loginUserController = (req, res) => {
    res.status(200).json({
        message: "Te loguaste con exito",
    });
};
exports.loginUserController = loginUserController;
