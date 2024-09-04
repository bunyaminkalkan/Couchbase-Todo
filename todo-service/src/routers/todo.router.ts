import { Router } from "express";
import { addTodo, deleteTodoById, getTodos, getTodoById, getDeletedTodos } from "../controllers/todo.controller";

const todoRouter = Router();

todoRouter.get("/", getTodos);
todoRouter.post("/", addTodo);
todoRouter.get("/deleted", getDeletedTodos);
todoRouter.get("/:todoId", getTodoById);
todoRouter.delete("/:todoId", deleteTodoById);

export default todoRouter;