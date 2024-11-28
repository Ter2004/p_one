'use client';

import { useEffect, useState } from 'react';

// Define type for product
interface Product {
  name: string;
  price: number;
  image: string;
}

export default function RePage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !image) {
      setMessage('All fields are required!');
      return;
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          image,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Product added successfully: ${result.data.name}`);
        // Reset form fields
        setName('');
        setPrice('');
        setImage('');
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium text-gray-700">
            Product Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter product price"
          />
        </div>
        <div>
          <label htmlFor="image" className="block font-medium text-gray-700">
            Product Image URL
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 p-2 w-full border rounded-lg"
            placeholder="Enter product image URL"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
}
