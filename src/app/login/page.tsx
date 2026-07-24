'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { Lock, Mail, Eye, EyeOff, Truck, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 800));

    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7F3] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00A651]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#16A34A]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-[#E6E6E6] shadow-lg shadow-[#00A651]/10 mb-4">
            <Truck className="w-8 h-8 text-[#00A651]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">QWQER Pakistan</h1>
          <p className="text-xs text-[#4B5163] mt-1">Delivery & Logistics Dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#E6E6E6] rounded-2xl p-8 shadow-xl shadow-black/5">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-[#1A1A1A]">Welcome back</h2>
            <p className="text-xs text-[#4B5163] mt-1">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#4B5163] mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@qwqer.pk"
                  required
                  className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#00A651]/30 focus:border-[#00A651] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#4B5163] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#F5F7F3] border border-[#E6E6E6] rounded-xl pl-10 pr-12 py-3 text-sm text-[#1A1A1A] placeholder:text-[#999] focus:outline-none focus:ring-2 focus:ring-[#00A651]/30 focus:border-[#00A651] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#1A1A1A] transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-[#CC3366]/10 border border-[#CC3366]/20 text-xs text-[#CC3366] font-semibold">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3.5 rounded-xl bg-[#00A651] hover:bg-[#16A34A] text-white text-sm font-bold shadow-lg shadow-[#00A651]/20 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 rounded-xl bg-[#EEF6F0] border border-[#00A651]/20">
            <p className="text-[11px] font-bold text-[#00A651] uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 text-[#4B5163]">
                <Mail className="w-3 h-3 text-[#00A651]" />
                <span className="font-mono">admin@qwqer.pk</span>
              </div>
              <div className="flex items-center gap-2 text-[#4B5163]">
                <Lock className="w-3 h-3 text-[#00A651]" />
                <span className="font-mono">qwqer123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#999] mt-6">
          &copy; 2026 QWQER Pakistan. Fast & Reliable Delivery.
        </p>
      </div>
    </div>
  );
}
