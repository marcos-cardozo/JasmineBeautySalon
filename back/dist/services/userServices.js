"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserServices = exports.registerUserServices = exports.getUserByIdServices = exports.getUsersServices = void 0;
const credentialsServices_1 = require("./credentialsServices");
const userList = [];
const id = 1;
const getUsersServices = () => {
    return userList;
};
exports.getUsersServices = getUsersServices;
const getUserByIdServices = (id) => {
    const userWanted = userList.find((user) => user.id === id);
    if (userWanted) {
        return userWanted;
    }
    else {
        throw new Error("Usuario no encontrado, intente nuevamente");
    }
};
exports.getUserByIdServices = getUserByIdServices;
const registerUserServices = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const idCredential = yield (0, credentialsServices_1.createCredentialsServices)(userData.username, userData.password);
    const newUser = {
        id,
        name: userData.name,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId: idCredential,
    };
    userList.push(newUser);
});
exports.registerUserServices = registerUserServices;
const loginUserServices = () => { };
exports.loginUserServices = loginUserServices;
