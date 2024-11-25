'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for Product
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [products, setProducts] = useState<Product[]>([]); // Define products with correct type
  const [loading, setLoading] = useState(true); // State for loading products
  const [editMode, setEditMode] = useState(false); // Track if editing a product
  const [editProductId, setEditProductId] = useState<number | null>(null); // Track product ID being edited

  useEffect(() => {
    // Check if the user has admin privileges
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.role !== 'admin') {
      router.push('/login'); // Redirect to login if not admin
    } else {
      fetchProducts(); // Fetch products if admin
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();

      if (result.success) {
        setProducts(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch products.');
      }
    } catch (error: any) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch product list.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrEditProduct = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    if (!productName || !price || !imageUrl) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      if (editMode && editProductId) {
        // Edit Product Logic
        const response = await fetch('/api/products', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editProductId,
            name: productName,
            price: parseFloat(price),
            image: imageUrl,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to edit product.');
        }

        const updatedProduct = await response.json();
        setProducts((prev) =>
          prev.map((product) =>
            product.id === editProductId ? { ...product, ...updatedProduct.data } : product
          )
        );
        setSuccessMessage('Product updated successfully!');
      } else {
        // Add Product Logic
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
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to add product.');
        }

        const newProduct = await response.json();
        setProducts((prev) => [...prev, newProduct.data]); // Update product list
        setSuccessMessage('Product added successfully!');
      }

      setProductName('');
      setPrice('');
      setImageUrl('');
      setEditMode(false);
      setEditProductId(null);
    } catch (error: any) {
      console.error('Error adding/editing product:', error);
      setErrorMessage(error.message || 'Error adding/editing product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const response = await fetch(`/api/products`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to delete product.');
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));
      setSuccessMessage('Product deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      setErrorMessage(error.message || 'Error deleting product. Please try again.');
    }
  };

  const startEditProduct = (product: Product) => {
    setEditMode(true);
    setEditProductId(product.id);
    setProductName(product.name);
    setPrice(product.price.toString());
    setImageUrl(product.image);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>

      {/* Add/Edit Product Section */}
      <div className="bg-gray-100 p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">
          {editMode ? 'Edit Product' : 'Add a New Product'}
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
            onClick={handleAddOrEditProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
        {successMessage && <p className="mt-4 text-green-600 font-medium">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>}
      </div>

      {/* Product List Section */}
      <div className="bg-gray-100 p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      onClick={() => startEditProduct(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
