'use client';

export default function ViewMetrics() {
  return (
    <div>
      <h1 className="text-2xl font-bold">View Metrics</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-semibold">New Users</h2>
          <p>จำนวนผู้ใช้งานใหม่: 50 คน</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="font-semibold">System Usage</h2>
          <p>การใช้งานระบบ: 80%</p>
        </div>
      </div>
    </div>
  );
}
