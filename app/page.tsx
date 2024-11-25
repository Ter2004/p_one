'use client';

import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const router = useRouter(); // Initialize router

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Updated Image Component */}
        <Image
          src="https://png.pngtree.com/png-clipart/20211009/original/pngtree-shopping-online-text-effect-png-image_6845783.png"
          alt="Shopping Online"
          width={200} // Adjust width
          height={100} // Adjust height
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h1>
        <p className="text-lg text-gray-600">
          How can you find this shop?
        </p>
      </div>
      <button
        onClick={() => router.push('/login')} // Navigate to the login page
        className="mt-8 px-6 py-2 bg-green-500 text-white text-lg font-medium rounded-lg hover:bg-green-600"
      >
        Login
      </button>
    </div>
  );
}
