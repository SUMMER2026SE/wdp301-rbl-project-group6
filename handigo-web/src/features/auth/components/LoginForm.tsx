import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../api/authApi";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // backend expects `email` and `password` — gửi identifier (email hoặc số) như email
      await authApi.login(identifier.trim(), password);
      // chuyển về trang chính sau khi đăng nhập thành công
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" method="POST">
      {/* Email/SĐT Input */}
      <div className="floating-label-group relative">
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <button
          className="absolute right-4 top-3 text-on-surface-variant"
          type="button"
        >
          <span className="material-symbols-outlined text-xl">visibility</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-xs font-medium">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input
            className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary bg-transparent"
            type="checkbox"
          />
          <span className="text-on-surface-variant dark:text-outline-variant group-hover:text-primary transition-colors">
            Ghi nhớ
          </span>
        </label>
        <Link
          className="text-primary hover:text-primary-container font-semibold transition-colors"
          to="#"
        >
          Quên mật khẩu?
        </Link>
      </div>

      {error && (
        <div className="text-sm text-negative font-medium">{error}</div>
      )}

      <button
        disabled={loading}
        className="w-full py-3 bg-primary text-on-primary text-base font-bold rounded-xl hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-60"
        type="submit"
      >
        {loading ? "Đang xử lý..." : "Đăng Nhập"}
      </button>
    </form>
  );
};
