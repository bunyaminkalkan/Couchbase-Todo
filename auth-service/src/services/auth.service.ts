import { getCouchbaseConnection } from "../db";
import { User } from "../models/user.model";

export const register = async (user: User) => {
  const { users } = await getCouchbaseConnection();

  await users.insert(user.id, user);

  const createdUser = await getUserById(user.id);

  return createdUser;
};

const getUserById = async (id: string) => {
  const { users } = await getCouchbaseConnection();

  const user = await users.get(id);

  return user.content;
};
