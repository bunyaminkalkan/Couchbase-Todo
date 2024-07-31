import { Router } from "express";
import { signUp, signIn, refreshToken } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);
authRouter.post("/refresh", refreshToken);

export default authRouter;
