'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link สำหรับสร้างลิงก์
import { login } from '@/app/services/authservice';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data = await login(email, password);

      if (data.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/user');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
