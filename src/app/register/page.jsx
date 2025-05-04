'use client';

import { useState } from 'react';
import { registerUser } from '@/api/authService';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUser(form);
      toast.success(res.message || 'Registration successful');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] bg-white shadow-lg rounded-xl p-6 space-y-5"
      >
        <h2 className="text-[28px] font-bold text-center text-violet-700 font-instrument">Create Account</h2>
        <p className="text-sm text-center text-gray-500 mb-4">Enter your details to get started</p>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="John Appleseed"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

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
          <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
          <input
            name="mobile"
            type="tel"
            placeholder="9876543210"
            value={form.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
            required
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-violet-700 font-medium hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}
