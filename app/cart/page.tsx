'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define Type for Product Data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number; // Add quantity field
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]); // State for cart items
  const router = useRouter();

  useEffect(() => {
    // Fetch cart data from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // Handle removing a product from the cart
  const handleRemoveFromCart = (id: string) => {
    const updatedCart = cart.map((product) =>
      product.id === id
        ? { ...product, quantity: product.quantity - 1 }
        : product
    ).filter((product) => product.quantity > 0); // Remove item if quantity is 0

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Navigate back to the Shop page
  const goToShop = () => {
    router.push('/shop');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Your cart is empty.</p>
          <button
            onClick={goToShop}
            className="mt-4 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
          >
            Back to Shop
          </button>
        </div>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Product
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Quantity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td className="border border-gray-300 px-4 py-2 flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover mr-4 rounded"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveFromCart(product.id)}
                      className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button
              onClick={goToShop}
              className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Back to Shop
            </button>
          </div>
        </>
      )}
    </div>
  );
}
