'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.role !== 'admin') {
      router.push('/login');
    } else {
      fetchProducts();
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
        setProducts((prev) => [...prev, newProduct.data]);
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
    <div className="p-4 sm:p-6 relative">
      {/* Back Button in Top-Right Corner */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.back()}
          className="flex items-center "
        >
          <img src="/images/back.png" alt="Back" className="w-6 h-6 mr-2" />
          Back
        </button>
      </div>

      {/* Header */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
      </header>

      {/* Add/Edit Product Section */}
      <div className="bg-gray-100 p-4 sm:p-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">
          {editMode ? 'Edit Product' : 'Add a New Product'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddOrEditProduct}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editMode ? 'Update Product' : 'Add Product'}
          </button>
        </div>
        {successMessage && <p className="mt-4 text-green-600 font-medium">{successMessage}</p>}
        {errorMessage && <p className="mt-4 text-red-600 font-medium">{errorMessage}</p>}
      </div>

      {/* Product List Section */}
      <div className="bg-gray-100 p-4 sm:p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-semibold text-black mb-4">Product List</h2>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Image</th>
                <th className="border border-gray-300 px-4 py-2 text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2 text-sm">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-y-2 sm:space-y-0 sm:space-x-2 text-center sm:text-left">
                    <button
                      onClick={() => startEditProduct(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
