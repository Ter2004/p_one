'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // ตรวจสอบว่าผู้ใช้มีสิทธิ์เป็น Admin
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.role !== 'admin') {
      router.push('/login'); // Redirect ไปหน้า Login หากไม่ได้เป็น Admin
    }
  }, [router]);

  const handleAddProduct = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    if (!productName || !price || !imageUrl) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName,
          price: parseFloat(price),
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product.');
      }

      setSuccessMessage('Product added successfully!');
      setProductName('');
      setPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error adding product. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Manage Users Section */}
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

        {/* View Metrics Section */}
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

      {/* Add New Product Section */}
      <div className="bg-gray-100 p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">
          Add a New Product
        </h2>
        <div className="grid grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </div>
        {/* Success and Error Messages */}
        {successMessage && (
          <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
