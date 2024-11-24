'use client';

export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-yellow-200 p-4 rounded shadow">
          <h2 className="font-semibold">Profile</h2>
          <a href="/dashboard/user/profile" className="text-yellow-500 hover:underline">
            Go to Profile
          </a>
        </div>
        <div className="bg-red-200 p-4 rounded shadow">
          <h2 className="font-semibold">Orders</h2>
          <a href="/dashboard/user/orders" className="text-red-500 hover:underline">
            Go to Orders
          </a>
        </div>
      </div>
    </div>
  );
}
