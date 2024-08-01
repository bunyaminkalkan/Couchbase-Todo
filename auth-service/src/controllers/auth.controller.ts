import { Request, Response, NextFunction } from "express";
import { login, refreshAccessToken, register } from "../services/auth.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const registeredUser = await register(user);
    res.status(200).json(registeredUser);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const credentials = req.body;
    const loggedInUser = await login(credentials);
    res.status(200).json(loggedInUser);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken = await refreshAccessToken(refreshToken);
    res.status(200).json(newAccessToken);
  } catch (error) {
    next(error);
  }
};
