export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'provider';
  avatarUrl?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  identifier: string; // email or phone
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  fullName: string;
  password: string;
  role: 'customer' | 'provider';
}
