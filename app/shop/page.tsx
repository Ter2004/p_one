'use client';

import { useEffect, useState } from 'react';

// กำหนด Type สำหรับข้อมูลของ Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]); // กำหนด Type ให้กับ products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const result = await response.json();

        // ตรวจสอบว่า API ส่งข้อมูลในรูปแบบที่คาดหวัง
        if (result.success) {
          setProducts(result.data); // ใช้ result.data แทน
        } else {
          throw new Error(result.message || 'Failed to fetch products');
        }
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <button
              onClick={() => alert(`Added ${product.name} to cart`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
