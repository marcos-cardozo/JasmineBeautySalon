import { NextFunction, Request, Response, Router } from "express";
import { cancelAppointmentController, getAppointmentsByIdController, getAppointmentsController, scheduleAppointmentController } from "../controllers/appointmentsController";
import { AppointmentScheduleDto } from "../dtos/AppointmentDto";
import { validateRegisterAppointmentData } from "../middlewares/appointmentMiddlewares";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", (req: Request, res: Response) => getAppointmentsController(req, res))

appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getAppointmentsByIdController(req, res))

appointmentsRouter.post("/schedule",(req: Request, res: Response, next: NextFunction) => validateRegisterAppointmentData(req, res, next), (req: Request<unknown, unknown, AppointmentScheduleDto>, res: Response) => scheduleAppointmentController(req, res))

appointmentsRouter.put("/cancel/:id", (req: Request<{ id: string }>, res: Response) => cancelAppointmentController(req, res))

export default appointmentsRouter