import React from 'react';
import { Link } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  return (
    <form action="#" className="space-y-5" method="POST">
      {/* Email/SĐT Input */}
      <div className="floating-label-group relative">
        <input 
          className="peer w-full h-12 px-4 pt-4 bg-surface-container-lowest dark:bg-on-surface-variant/10 border border-outline-variant dark:border-outline/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm text-on-surface dark:text-surface-bright" 
          id="identifier" 
          placeholder=" " 
          required 
          type="text" 
        />
        <label 
          className="absolute left-4 top-3 text-sm text-on-surface-variant dark:text-outline-variant origin-left transition-all peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85" 
          htmlFor="identifier"
        >
          Email hoặc Số điện thoại
        </label>
      </div>

      {/* Password Input */}
      <div className="floating-label-group relative">
        <input 
          className="peer w-full h-12 px-4 pt-4 bg-surface-container-lowest dark:bg-on-surface-variant/10 border border-outline-variant dark:border-outline/30 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm text-on-surface dark:text-surface-bright" 
          id="password" 
          placeholder=" " 
          required 
          type="password" 
        />
        <label 
          className="absolute left-4 top-3 text-sm text-on-surface-variant dark:text-outline-variant origin-left transition-all peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85" 
          htmlFor="password"
        >
          Mật khẩu
        </label>
        <button className="absolute right-4 top-3 text-on-surface-variant" type="button">
          <span className="material-symbols-outlined text-xl">visibility</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs font-medium">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-transparent" type="checkbox" />
          <span className="text-on-surface-variant dark:text-outline-variant group-hover:text-primary transition-colors">Ghi nhớ</span>
        </label>
        <Link className="text-primary hover:text-primary-container font-semibold transition-colors" to="#">Quên mật khẩu?</Link>
      </div>

      <button className="w-full py-3 bg-primary text-on-primary text-base font-bold rounded-xl hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/20" type="submit">
        Đăng Nhập
      </button>
    </form>
  );
};
