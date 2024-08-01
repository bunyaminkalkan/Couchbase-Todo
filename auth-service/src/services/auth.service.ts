import { getCouchbaseConnection } from "../db";
import { User } from "../@types";
import TokenService from "./token.service";
import bcrypt from "bcryptjs";
import APIError from "../errors/APIError";

const SALT = process.env.SALT || "";

export const register = async (user: User) => {
  const { users } = await getCouchbaseConnection();
  const hashedPassword = await bcrypt.hash(user.password || "", SALT);
  delete user.password;
  await users.insert(user.id, { ...user, password: hashedPassword });

  const createdUser = await getUserById(user.id);

  return createdUser;
};

const getUserById = async (id: string) => {
  const { users } = await getCouchbaseConnection();

  const user = await users.get(id);

  return user.content;
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const user = await getUserByEmail(credentials.email);
  if (!bcrypt.compareSync(credentials.password, user.password)) {
    throw new APIError(403, "CREDENTIALS_ARE_WRONG", "Username or password are wrong")
  }

  delete user.password;

  const accessToken = TokenService.generateAccessToken(user);
  const refreshToken = TokenService.generateRefreshToken({ id: user.id });

  return {
    accessToken,
    refreshToken,
    data: user,
  };
};

const getUserByEmail = async (email: string) => {
  const { cluster } = await getCouchbaseConnection();
  const result = await cluster.query(
    "SELECT u.* FROM `UserTodoDB`.`Auth`.`Users` u WHERE email = " +
      `"${email}"`
  );

  if (result.rows.length === 0) throw new APIError(404, 'USER_NOT_FOUND', 'No such user')

  return result.rows[0];
};

export const refreshAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = TokenService.verifyRefreshToken(refreshToken);
  const user = await getUserById(verifiedRefreshToken.id);
  delete user.password;
  const accessToken = TokenService.generateAccessToken(user);
  return { accessToken };
};
