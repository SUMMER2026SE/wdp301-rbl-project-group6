import bcrypt from "bcrypt";
import User, { IUser } from "../models/user.model";
import { generateOtp, getOtpExpireDate, hashOtp } from "../utils/otp";
import { sendOtpEmail } from "../utils/mail";
import { signAccessToken } from "../utils/token";
import { AppError } from "../utils/appError";

const SALT_ROUNDS = 10;

type AuthUserResponse = {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string | null;
  role: string;
  status: string;
  isEmailVerified: boolean;
};

const ensureOtpValid = (
  otp: string,
  storedOtp?: string,
  expireDate?: Date,
): void => {
  if (!storedOtp || !expireDate) {
    throw new AppError("OTP is not available or has expired", 400);
  }

  if (expireDate.getTime() < Date.now()) {
    throw new AppError("OTP has expired", 400);
  }

  if (storedOtp !== hashOtp(otp)) {
    throw new AppError("Invalid OTP", 400);
  }
};

const createAndSendRegisterOtp = async (user: IUser): Promise<void> => {
  const otp = generateOtp();
  user.registerOtp = hashOtp(otp);
  user.registerOtpExpire = getOtpExpireDate();
  await user.save();

  await sendOtpEmail(user.email, "Verify your Handigo account", otp);
};

export const register = async (payload: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}): Promise<void> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser?.isEmailVerified) {
    throw new AppError("Email is already registered", 409);
  }

  const passwordHash = await bcrypt.hash(payload.password, SALT_ROUNDS);

  if (existingUser) {
    existingUser.passwordHash = passwordHash;
    existingUser.fullName = payload.fullName;
    existingUser.phone = payload.phone;
    existingUser.status = "ACTIVE";
    await createAndSendRegisterOtp(existingUser);
    return;
  }

  const user = await User.create({
    email: payload.email,
    passwordHash,
    fullName: payload.fullName,
    phone: payload.phone,
    role: "CUSTOMER",
    status: "ACTIVE",
    isEmailVerified: false,
  });

  await createAndSendRegisterOtp(user);
};

export const verifyRegisterOtp = async (
  email: string,
  otp: string,
): Promise<void> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isEmailVerified) {
    throw new AppError("Email is already verified", 409);
  }

  ensureOtpValid(otp, user.registerOtp, user.registerOtpExpire);

  user.isEmailVerified = true;
  user.registerOtp = undefined;
  user.registerOtpExpire = undefined;
  await user.save();
};

export const resendRegisterOtp = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.isEmailVerified) {
    throw new AppError("Email is already verified", 409);
  }

  await createAndSendRegisterOtp(user);
};

export const login = async (
  email: string,
  password: string,
): Promise<{ token: string; user: AuthUserResponse }> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status === "BANNED" || user.status === "INACTIVE") {
    throw new AppError("Account is not allowed to login", 403);
  }

  if (!user.isEmailVerified) {
    throw new AppError("Email is not verified", 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signAccessToken(user);

  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      status: user.status,
      isEmailVerified: user.isEmailVerified,
    },
  };
};

export const forgotPassword = async (email: string): Promise<void> => {
  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const otp = generateOtp();
  user.resetPasswordOtp = hashOtp(otp);
  user.resetPasswordOtpExpire = getOtpExpireDate();
  await user.save();

  await sendOtpEmail(user.email, "Reset your Handigo password", otp);
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string,
): Promise<void> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  ensureOtpValid(otp, user.resetPasswordOtp, user.resetPasswordOtpExpire);

  user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  user.resetPasswordOtp = undefined;
  user.resetPasswordOtpExpire = undefined;
  user.resetPasswordTokenHash = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  user.passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await user.save();
};

export const getCurrentUser = async (userId: string): Promise<Partial<IUser>> => {
  const user = await User.findById(userId).select(
    "-passwordHash -registerOtp -resetPasswordOtp",
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
