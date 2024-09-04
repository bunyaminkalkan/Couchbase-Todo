export interface Todo {
  id: string;
  text: string;
  author: string;
  isCompleted: boolean;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
