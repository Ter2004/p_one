'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Header Section */}
      <div className="text-center">
        <Image
          src="/images/logo.png"
          alt="Shopping Online"
          width={500}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome!</h1>
        <p className="text-lg text-gray-600">
          How can you find this shop?
        </p>
      </div>

      {/* Login Button */}
      <button
        onClick={() => router.push('/login')}
        className="mt-8 px-8 py-4 text-xl bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transform hover:scale-105 transition duration-300"
      >
        Login
      </button>

      {/* About Us Section */}
      <div className="mt-16 bg-gray-50 w-full px-6 py-8 text-center rounded-lg shadow-md max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About SneakTer Store</h2>
        <p className="text-gray-600 mb-6">
          At SneakTer Store, we are passionate about sneakers and providing the best shopping
          experience. Whether you're a sneaker enthusiast or just looking for a comfortable
          pair of shoes, we've got you covered! We are dedicated to offering high-quality
          products and excellent customer service to meet your needs.
        </p>
        <Image
          src="/images/about-us.jpg"
          alt="About SneakTer Store"
          width={400}
          height={250}
          className="mx-auto rounded-lg shadow"
        />
      </div>
    </div>
  );
}
