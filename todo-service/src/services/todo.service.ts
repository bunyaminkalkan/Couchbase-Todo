import { getCouchbaseConnection } from "../db";
import { Todo } from "../@types";

export const createTodo = async (id: string, todo: Todo) => {
  const { users } = await getCouchbaseConnection();
  const user = await getUserById(id);
  if (!user.todos) {
    user.todos = [];
  }
  todo.createdAt = new Date();
  todo.updatedAt = new Date();
  todo.expireDate = new Date(Date.now() + 6.048e8 * 2);

  user.todos.push(todo);
  await users.upsert(id, user);

  const addedTodoUser = await getUserById(id);
  return addedTodoUser.todos;
};

const getUserById = async (id: string) => {
  const { users } = await getCouchbaseConnection();
  const user = await users.get(id);
  return user.content;
};

export const getTodosByDocumentId = async (documentId: string) => {
  const user = await getUserById(documentId);
  return user.todos;
};

export const getOneTodo = async (documentId: string, todoId: string) => {
  const user = await getUserById(documentId);
  const todo = findTodoById(user.todos, todoId);
  return todo;
};

const findTodoById = (todos: Todo[], id: string): Todo | undefined => {
  return todos.find((todo) => todo.id === id);
};

export const deleteOneTodo = async (documentId: string, todoId: string) => {
  const { users, deletedTodos } = await getCouchbaseConnection();
  const user = await getUserById(documentId);
  const todoIndex = user.todos.findIndex((todo: Todo) => todo.id === todoId);

  if (todoIndex !== -1) {
    const deletedTodo = user.todos.splice(todoIndex, 1)[0];
    deletedTodo.documentId = documentId;

    await deletedTodos.upsert(deletedTodo.id, deletedTodo);
    await users.upsert(documentId, user);
  }
  const todos = await getTodosByDocumentId(documentId);
  return todos;
};

export const getDeletedTodosByDocumentId = async (documentId: string) => {
  const { cluster } = await getCouchbaseConnection();

  const query =
    "SELECT d.* FROM `UserTodoDB`.`user-todo`.`Deleted_Todo` d WHERE d.documentId = $documentId";

  const result = await cluster.query(query, { parameters: { documentId } });

  return result.rows;
};
