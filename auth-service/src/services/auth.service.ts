import { getCouchbaseConnection } from "../db";
import { User } from "../@types";
import TokenService from "./token.service";
import bcrypt from "bcryptjs";

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
    // throw exception
    return {
      success: false,
    };
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
  return result.rows[0];
};

export const refreshAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = TokenService.verifyRefreshToken(refreshToken);
  const user = await getUserById(verifiedRefreshToken.id);
  delete user.password;
  const accessToken = TokenService.generateAccessToken(user);
  return { accessToken };
};
