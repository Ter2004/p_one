'use client';

import { useEffect, useState } from 'react';

// Define Type for Product Data
interface Product {
  id: string; // Updated to match Prisma default ID type
  name: string;
  price: number;
  image: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]); // Define type for products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Fetch data from API
        if (!response.ok) {
          throw new Error('Failed to fetch products'); // Handle HTTP errors
        }
        const result = await response.json();

        // Validate API response structure
        if (result.success && Array.isArray(result.data)) {
          setProducts(result.data); // Use `result.data` for products
        } else {
          throw new Error(result.message || 'Unexpected API response');
        }
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message || 'Unknown error occurred');
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>; // Display loading state
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>; // Display error message
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
