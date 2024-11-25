'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user || !user.role) {
      router.push('/login'); // Redirect to Login if no user data
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Welcome to Our App</h1>
      <div className="flex gap-4">
        <button
          onClick={() => router.push('/shop')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shopping
        </button>
        <button
          onClick={() => router.push('/dashboard/admin')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Admin
        </button>
      </div>
    </div>
  );
}
