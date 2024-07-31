import { Request, Response, NextFunction } from "express";
import { login, refreshAccessToken, register } from "../services/auth.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;
  const registeredUser = await register(user);
  res.status(200).json(registeredUser);
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const credentials = req.body;
  const loggedInUser = await login(credentials);
  res.status(200).json(loggedInUser);
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  const newAccessToken = await refreshAccessToken(refreshToken);
  res.status(200).json(newAccessToken);
};
