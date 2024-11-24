'use client';

import { useState, useEffect } from 'react';
import { fetchUsers } from '@/app/services/userService';

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]); // State สำหรับเก็บข้อมูลผู้ใช้งาน
  const [error, setError] = useState<string | null>(null); // State สำหรับเก็บ Error

  // ใช้ useEffect ดึงข้อมูลจาก API
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data); // ตั้งค่าข้อมูลผู้ใช้งาน
      } catch (err: any) {
        setError(err.message || 'Failed to fetch users.');
      }
    };

    getUsers();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>; // แสดงข้อความ Error
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Name</th>
            <th className="border border-gray-200 p-2">Email</th>
            <th className="border border-gray-200 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-200 p-2">{user.id}</td>
              <td className="border border-gray-200 p-2">{user.name}</td>
              <td className="border border-gray-200 p-2">{user.email}</td>
              <td className="border border-gray-200 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
