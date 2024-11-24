'use client';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-200 p-4 rounded shadow">
          <h2 className="font-semibold">Manage Users</h2>
          <p>จัดการข้อมูลผู้ใช้งาน</p>
          <a href="/dashboard/admin/manage-users" className="text-blue-500 hover:underline">
            Go to Manage Users
          </a>
        </div>
        <div className="bg-green-200 p-4 rounded shadow">
          <h2 className="font-semibold">View Metrics</h2>
          <p>ดูข้อมูลสถิติ</p>
          <a href="/dashboard/admin/view-metrics" className="text-green-500 hover:underline">
            Go to Metrics
          </a>
        </div>
      </div>
    </div>
  );
}
