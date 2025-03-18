import { NextFunction, Request, Response } from "express";

export const validateUserRegisterData = (req: Request, res: Response, next: NextFunction): void => {

    const fields: string[] = ["birthdate", "email", "nDni", "name", "password", "username"]

    const filteredFilds = fields.filter(field => !req.body[field])

    if(filteredFilds.length > 0){
        res.status(400).json({
            message: `Falta informacion para poder registrar al usuario, verifique el ${filteredFilds.join("")}`
        })
    }else next()
}