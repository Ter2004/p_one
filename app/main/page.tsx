'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function MainPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ role?: string; email?: string } | null>(null);
  const [warning, setWarning] = useState(false); // State to show warning popup
  const [logoutConfirm, setLogoutConfirm] = useState(false); // State for logout confirmation

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!storedUser || !storedUser.role) {
      router.push('/login'); // Redirect to Login if no user data
    } else {
      setUser(storedUser);
    }
  }, [router]);

  const handleAdminClick = () => {
    if (user?.role !== 'admin') {
      setWarning(true); // Show warning popup if not admin
    } else {
      router.push('/dashboard/admin');
    }
  };

  const closeWarning = () => setWarning(false); // Close the warning popup

  const confirmLogout = () => {
    setLogoutConfirm(false); // Close the confirmation popup
    localStorage.removeItem('user'); // Clear user data
    router.push('/login'); // Redirect to login page
  };

  const cancelLogout = () => setLogoutConfirm(false); // Close logout confirmation popup

  return (
    <div className="min-h-screen">
      {/* Full-Width Image with Rounded Corners */}
      <div className="w-full overflow-hidden">
        <Image
          src="/images/nara.jpg" // Replace with your image path
          alt="Full-Width Image"
          width={1920}
          height={600}
          className="object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-4 mt-6">
        <button
          onClick={() => router.push('/shop')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Shopping
        </button>
        <button
          onClick={handleAdminClick}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Admin
        </button>
        <button
          onClick={() => setLogoutConfirm(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </div>

      {/* Warning Popup */}
      {warning && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold text-red-500 mb-4">
              Warning: For Admin Only
            </h2>
            <p className="text-gray-600 mb-6">Please login again with an admin account.</p>
            <button
              onClick={closeWarning}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {logoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
