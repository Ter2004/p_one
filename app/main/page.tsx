'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center bg-gray-200 px-6 py-4 shadow-md">
        {/* Display Gmail */}
        {user && (
          <p className="text-gray-700 font-medium">
            Welcome, <span className="font-semibold">{user.email}</span>!
          </p>
        )}

        {/* Log Out Button */}
        <button
          onClick={() => setLogoutConfirm(true)} // Show confirmation popup
          className="px-4 py-2 bg-red-500 text-white font-medium rounded hover:bg-red-600"
        >
          Log Out
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1 className="text-2xl font-bold mb-6">Welcome to Our App</h1>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/shop')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Shopping
          </button>
          <button
            onClick={handleAdminClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-green-600"
          >
            Admin
          </button>
        </div>
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

      {/* Back Button */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={() => router.back()} // Use router.back() to go to the previous page
          className="px-4 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}
