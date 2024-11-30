'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { login } from '@/app/services/authservice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    if (loading) return;
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password);

      router.push('/main');
      console.log(`${data.role} login successful!`);
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      {/* Left Section - Login Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6 lg:p-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">SneakTer Store</h1>
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 text-white font-bold rounded-lg transition duration-300 ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-700">
            "Yo, new around here? Create an account, homie!"{' '}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </div>

      {/* Right Section - Jordan Image */}
      <div className="relative w-full lg:w-1/2 h-80 lg:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/jordan.png"
          alt="Jordan Shoe"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />

        {/* Quote */}
        <div className="absolute text-center text-white z-10">
          <h2
            className="text-5xl font-extrabold text-red-500 italic mb-4"
            style={{
              WebkitTextStroke: '1px black',
              textShadow: '3px 3px 5px rgba(0, 0, 0, 0.8)',
            }}
          >
            It’s not just a shoe,
          </h2>
          <h3
            className="text-4xl font-semibold text-white italic"
            style={{
              WebkitTextStroke: '1px black',
              textShadow: '3px 3px 5px rgba(0, 0, 0, 0.8)',
            }}
          >
            it’s a lifestyle.
          </h3>
        </div>
      </div>
    </div>
  );
}
