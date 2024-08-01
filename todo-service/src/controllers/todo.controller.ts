import { Request, Response, NextFunction } from "express";
import {
  createTodo,
  getTodosByDocumentId,
  getOneTodo,
  deleteOneTodo,
  getDeletedTodosByDocumentId,
} from "../services/todo.service";

export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.body["documentId"];
    const todo = req.body["todo"];
    const createdTodo = await createTodo(documentId, todo);
    res.status(200).json(createdTodo);
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.body["documentId"];
    const todos = await getTodosByDocumentId(documentId);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.body["documentId"];
    const { todoId } = req.params;
    const todo = await getOneTodo(documentId, todoId);
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.body["documentId"];
    const { todoId } = req.params;
    const deletedTodo = await deleteOneTodo(documentId, todoId);
    res.status(200).json(deletedTodo);
  } catch (error) {
    next(error);
  }
};

export const getDeletedTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documentId = req.body["documentId"];
    const deletedTodos = await getDeletedTodosByDocumentId(documentId);
    res.status(200).json(deletedTodos);
  } catch (error) {
    next(error);
  }
};
