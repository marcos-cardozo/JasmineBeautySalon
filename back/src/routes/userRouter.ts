import { NextFunction, Request, Response, Router } from "express";
import { getUserByIdController, getUsersController, loginUserController, registerUserController } from "../controllers/usersControllers";
import { UserLoginDto, UserRegisterDto } from "../dtos/UserDto";
import { validateUserRegisterData } from "../middlewares/userMidlewares";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) => getUsersController(req, res))

userRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => getUserByIdController(req, res))

userRouter.post("/register",(req: Request, res: Response, next: NextFunction) => validateUserRegisterData(req, res, next), (req: Request<unknown, unknown, UserRegisterDto>, res: Response) => 
    registerUserController(req, res))

userRouter.post("/login", (req: Request<unknown, unknown, UserLoginDto>, res: Response) => 
    loginUserController(req, res))

export default userRouter