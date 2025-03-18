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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCredentialsServices = exports.userCheckCredentials = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const credentialsList = [];
let id = 1;
const userCheckCredentials = (username, password) => {
    const usernameCheck = credentialsList.find(credential => credential.username === username);
    if (usernameCheck) {
        const passwordCheck = usernameCheck.password === password;
        if (passwordCheck) {
            return usernameCheck.id;
        }
        else {
            throw new Error("Usuario o Contraseña incorrectos");
        }
    }
    else {
        throw new Error("Usuario o Contraseña incorrectos");
    }
};
exports.userCheckCredentials = userCheckCredentials;
const passwordEncryption = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordEncrypted = yield bcrypt_1.default.hash(password, 10);
    return passwordEncrypted;
});
const createCredentialsServices = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const encryptedPassword = yield passwordEncryption(password);
    const newCredentials = {
        id,
        username,
        password: encryptedPassword
    };
    credentialsList.push(newCredentials);
    return id++;
});
exports.createCredentialsServices = createCredentialsServices;
