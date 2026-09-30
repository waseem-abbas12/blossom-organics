import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState("admin@blossom.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const res = adminLogin(email, password);
    if (res.success) {
      navigate('/admin/dashboard');
    } else {
      setError(res.message);
    }
  };

  const fillQuickDemo = () => {
    setEmail("admin@blossom.com");
    setPassword("admin123");
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#7b3e1d]/10 text-[#7b3e1d] rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center space-x-1.5 pt-1">
            <span className="text-xl font-serif font-black tracking-wider uppercase">Blossom</span>
            <span className="text-xl font-serif italic text-[#c59b27] font-bold">Admin</span>
          </div>
          <p className="text-xs text-gray-500">
            Sign in to manage products, orders, banners & store settings
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@blossom.com"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-[#7b3e1d]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#1a1a1a] hover:bg-[#7b3e1d] text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <span>Log In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-gray-100 flex flex-col items-center gap-2">
          <button
            onClick={fillQuickDemo}
            type="button"
            className="text-[11px] text-[#7b3e1d] hover:underline font-semibold"
          >
            Fill Demo Credentials (admin@blossom.com / admin123)
          </button>

          <Link to="/" className="text-xs text-gray-400 hover:text-black">
            &larr; Back to Blossom Organics Store
          </Link>
        </div>
      </div>
    </div>
  );
};
