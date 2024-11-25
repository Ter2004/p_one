'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // ตรวจสอบว่าผู้ใช้มีสิทธิ์เป็น Admin
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.role !== 'admin') {
      router.push('/login'); // Redirect ไปหน้า Login หากไม่ได้เป็น Admin
    }
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-200 p-4 rounded shadow">
          <h2 className="font-semibold text-black">Manage Users</h2>
          <p className="text-black">จัดการข้อมูลผู้ใช้งาน</p>
          <a href="/dashboard/admin/manage-users" className="text-blue-500 hover:underline">
            Go to Manage Users
          </a>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="font-semibold text-black">View Metrics</h2>
          <p className="text-black">ดูข้อมูลสถิติ</p>
          <a href="/dashboard/admin/view-metrics" className="text-green-500 hover:underline">
            Go to Metrics
          </a>
        </div>
      </div>
    </div>
  );
}
