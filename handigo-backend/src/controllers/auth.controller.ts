import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.register(req.body);
    res.status(201).json({
      message: "Registration OTP has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyRegisterOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.verifyRegisterOtp(req.body.email, req.body.otp);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const resendRegisterOtp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.resendRegisterOtp(req.body.email);
    res.json({ message: "Registration OTP has been resent" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({
      message: "If the email exists, a reset OTP has been sent",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.resetPassword(
      req.body.email,
      req.body.otp,
      req.body.newPassword,
    );
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await authService.changePassword(
      req.user!.id,
      req.body.currentPassword,
      req.body.newPassword,
    );
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getCurrentUser(req.user!.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
