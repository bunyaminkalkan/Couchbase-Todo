import { Request, Response, NextFunction } from "express";
import { register } from "../services/auth.service";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  const registeredUser = await register(user);
  res.status(200).json(registeredUser)
};
