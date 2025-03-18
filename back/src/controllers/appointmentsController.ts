import { Request, Response } from "express";
import { AppointmentScheduleDto } from "../dtos/AppointmentDto";
import { cancelAppointmentServices, getAppointmentByIdServices, getAppointmentsServices, scheduleAppointmentServices } from "../services/appointmentsServices";
import { PostgresError } from "../interfaces/IError";

export const getAppointmentsController: (req: Request, res: Response) => void = async(req: Request, res: Response) => {
  try {
    const services = await getAppointmentsServices()
    res.status(200).json({
      message: "Obtuviste la informacion de todo el listado de todos las citas",
      data: services
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido"
    })
  }

};

export const getAppointmentsByIdController: (req: Request<{ id: string }>, res: Response) => void = 
async(req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
   try {
    const services = await getAppointmentByIdServices(parseInt(id))
    res.status(200).json({
      message: `Obtuviste la informacion de la cita numero ${id}`,
      data: services
    });
   } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido"
    })
   }

};

export const scheduleAppointmentController: (req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response) => void = 
async (req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response) => {

  try {
    const service = await scheduleAppointmentServices(req.body)
  
    res.status(201).json({
      message: "Cita creada con éxito",
      data: service
    });
  } catch (error) {

    const err = error as PostgresError;

    res.status(400).json({
      message: "Error en el servidor",
      data: err instanceof Error ? err.detail ? err.detail : err.message : "Error desconocido"
    })
  }
};

export const cancelAppointmentController: (req: Request<{ id: string }>, res: Response) => void = 
async(req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  try {
    const services = await cancelAppointmentServices(parseInt(id))
    res.status(200).json({
      message: `Cancelaste la cita numero ${id}`,
      data: services
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido"
    })
  }


};
