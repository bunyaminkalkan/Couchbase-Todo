export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  lastname: string;
}

export type SafeUser = Omit<User, "password">;
