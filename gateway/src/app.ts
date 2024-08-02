import express, { NextFunction, Request, Response } from "express";
import { urlencoded } from "body-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import jwt from "jsonwebtoken";
import { SafeUser } from "./@types";


const TOKEN_SECRET = process.env.TOKEN_SECRET || "";

const app = express();

app.use(urlencoded({ extended: false }));

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const accessToken = authHeader.split(" ")[1];
  const user = jwt.verify(accessToken, TOKEN_SECRET) as SafeUser;
  req.headers.documentId = user.id;
  next();
};


const authProxy = createProxyMiddleware({
  target: "http://AuthService:3001/api/auth",
});

const todoProxy = createProxyMiddleware({
  target: "http://TodoService:3002/api/todo",
});

app.use("/api/auth", authProxy);
app.use("/api/todo", checkAuth, todoProxy);

export default app;
