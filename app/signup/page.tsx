'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/services/authservice';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mb-4">
            Registration successful! Redirecting to Sign In...
          </p>
        )}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black" // Text inside box
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold mb-2 text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black" // Text inside box
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200 text-black" // Text inside box
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-black">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
