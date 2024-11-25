'use client';

import { useEffect, useState } from 'react';

export default function ViewMetrics() {
  const [metrics, setMetrics] = useState<{ newUsers: number; systemUsage: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching metrics data (Replace with real API call if available)
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        // Simulated data fetch
        const data = await new Promise<{ newUsers: number; systemUsage: number }>((resolve) =>
          setTimeout(() => resolve({ newUsers: 50, systemUsage: 80 }), 1000)
        );
        setMetrics(data);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to fetch metrics. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <p className="text-center text-black">Loading metrics...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">View Metrics</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="font-semibold text-black">New Users</h2>
          <p className="text-black">จำนวนผู้ใช้งานใหม่: {metrics?.newUsers} คน</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="font-semibold text-black">System Usage</h2>
          <p className="text-black">การใช้งานระบบ: {metrics?.systemUsage}%</p>
        </div>
      </div>
    </div>
  );
}
