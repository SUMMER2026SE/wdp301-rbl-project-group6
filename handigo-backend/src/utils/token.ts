import jwt, { SignOptions } from "jsonwebtoken";
import { IUser } from "../models/user.model";

const getAccessSecret = (): string => {
  const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET or JWT_SECRET must be defined");
  }

  return secret;
};

export const signAccessToken = (user: IUser): string => {
  const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"];

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    getAccessSecret(),
    { expiresIn },
  );
};
