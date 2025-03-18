import { NextFunction, Request, Response } from "express";

export const validateRegisterAppointmentData = (req: Request, res: Response, next: NextFunction): void => {
    const fields: string[] = ["date", "time", "userId"]

    const filteredFilds = fields.filter(field => !req.body[field])

    if(filteredFilds.length > 0){
        res.status(400).json({
            message: `Falta informacion para poder registrar la cita, verifique el ${filteredFilds.join("")}`
        })
    }else next()
}