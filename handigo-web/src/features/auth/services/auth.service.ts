import { loginApi, logoutApi, googleLoginApi, facebookLoginApi } from '../api/auth.api';
import type { LoginRequest } from '../types/auth.types';
import { useAuthStore } from '../store/auth.store';
import axios from 'axios';

export const authService = {
  login: async (credentials: LoginRequest) => {
    try {
      const response = await loginApi(credentials);
      const { user, token } = response;
      useAuthStore.getState().setAuth(user, token);
      return response;
    } catch (error) {
      let message = 'Failed to login';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message, { cause: error });
    }
  },

  googleLogin: async (credential: string) => {
    try {
      const response = await googleLoginApi(credential);
      const { user, token } = response;
      useAuthStore.getState().setAuth(user, token);
      return response;
    } catch (error) {
      let message = 'Google login failed';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message, { cause: error });
    }
  },

  facebookLogin: async (accessToken: string) => {
    try {
      const response = await facebookLoginApi(accessToken);
      const { user, token } = response;
      useAuthStore.getState().setAuth(user, token);
      return response;
    } catch (error) {
      let message = 'Facebook login failed';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      throw new Error(message, { cause: error });
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.warn('Logout API failed, continuing with local cleanup:', error);
    } finally {
      useAuthStore.getState().logout();
    }
  }
};
