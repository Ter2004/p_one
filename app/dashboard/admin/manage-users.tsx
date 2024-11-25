'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  useEffect(() => {
    const validateAdminAccess = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');

        // Check if user data exists and has the admin role
        if (!userData || userData.role !== 'admin') {
          setError('Unauthorized access. Redirecting to login.');
          router.push('/login'); // Redirect to Login if not an admin
        }
      } catch (error) {
        console.error('Error validating admin access:', error);
        setError('An error occurred. Redirecting to login.');
        router.push('/login'); // Redirect in case of an error
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    validateAdminAccess();
  }, [router]);

  if (loading) {
    return <p className="text-center text-black">Loading...</p>; // Display a loading message
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>; // Display error message if needed
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-200 p-4 rounded shadow">
          <h2 className="font-semibold text-black">Manage Users</h2>
          <p className="text-black">จัดการข้อมูลผู้ใช้งาน</p>
          <a
            href="/dashboard/admin/manage-users"
            className="text-blue-500 hover:underline"
          >
            Go to Manage Users
          </a>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="font-semibold text-black">View Metrics</h2>
          <p className="text-black">ดูข้อมูลสถิติ</p>
          <a
            href="/dashboard/admin/view-metrics"
            className="text-green-500 hover:underline"
          >
            Go to Metrics
          </a>
        </div>
      </div>
    </div>
  );
}
