'use client';

import { useState } from 'react';
import { loginUser } from '@/api/authService';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
      Cookies.set('token', res.token);
      toast.success(res.message || 'Login successful');
      setTimeout(() => router.push('/home'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white shadow-lg rounded-xl p-6 space-y-5 font-instrument"
      >
        <h2 className="text-[28px] font-bold text-center text-violet-700">Welcome back</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Log in with your credentials</p>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            name="password"
            type="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[46px] rounded-lg text-white font-semibold transition ${
              loading
                ? 'bg-violet-300 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Don’t have an account?{' '}
          <a href="/register" className="text-violet-700 font-medium hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
