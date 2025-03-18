import { Request, Response } from "express";
import {
  UserLoginDto,
  UserLoginSucessDto,
  UserRegisterDto,
} from "../dtos/UserDto";
import {
  getUserByIdServices,
  getUsersServices,
  loginUserService,
  registerUserServices,
} from "../services/userServices";
import { PostgresError } from "../interfaces/IError";

export const getUsersController: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response): Promise<void> => {
  try {
    const service = await getUsersServices();
    res.status(200).json({
      message: "Obtuviste la informacion de todo el listado de usuarios",
      data: service,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getUserByIdController: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const service = await getUserByIdServices(parseInt(id));
    res.status(200).json({
      message: `Obtuviste la informacion del usuario numero ${id}`,
      data: service,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error en el servidor",
      data: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const registerUserController: (
  req: Request<unknown, unknown, UserRegisterDto>,
  res: Response
) => void = async (
  req: Request<unknown, unknown, UserRegisterDto>,
  res: Response
): Promise<void> => {
  try {
    await registerUserServices(req.body);
    res.status(201).json({
      message: "Usuario registrado con éxito",
    });
  } catch (error) {
    const postgresError = error as PostgresError;

    res.status(400).json({
      message: "Error en el servidor",
      data:
        postgresError instanceof Error
          ? postgresError.detail
            ? postgresError.detail
            : postgresError.message
          : "Error desconocido",
    });
  }
};

export const loginUserController = async (
  req: Request<unknown, unknown, UserLoginDto>,
  res: Response
) => {
  try {
    const response: UserLoginSucessDto | null = await loginUserService(
      req.body
    );
    res.status(200).json(response);
  } catch (error) {
    const postgresError = error as PostgresError;

    res.status(400).json({
      message: "No se ha podido completar la solicitud",
      data:
        postgresError instanceof Error
          ? postgresError.detail
            ? postgresError.detail
            : postgresError.message
          : "Error desconocido",
    });
  }
};
