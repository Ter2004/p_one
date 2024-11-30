'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '@/app/services/authservice';
import Image from 'next/image';

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
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-white">
      {/* Left Section - Jordan Image with Quote */}
      <div className="relative w-full lg:w-1/2 h-80 lg:h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/jordan.png"
          alt="Jordan Shoe"
          layout="fill"
          objectFit="cover"
          objectPosition="left"
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

      {/* Right Section - Sign Up Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6 lg:p-16">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-500 text-sm mb-4 text-center">
              Registration successful! Redirecting to Sign In...
            </p>
          )}
          <form onSubmit={handleSignUp}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
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

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
              />
            </div>

            <button
              type="submit"
              className={`w-full py-3 text-white font-bold rounded-lg shadow-md transition duration-300 ${
                success
                  ? 'bg-green-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'
              }`}
              disabled={success}
            >
              {success ? 'Redirecting...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            "Bounce back to login, fam!"{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
