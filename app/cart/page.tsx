'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define Type for Product Data
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmPurchase, setConfirmPurchase] = useState(false); // For confirmation modal
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleRemoveFromCart = (id: string, size: string) => {
    const updatedCart = cart
      .map((product) =>
        product.id === id && product.size === size
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
      .filter((product) => product.quantity > 0);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const goToShop = () => {
    router.push('/shop');
  };

  const handlePurchase = () => {
    setConfirmPurchase(true); // Show confirmation modal
  };

  const confirmClearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    setShowSuccessModal(true);
    setConfirmPurchase(false);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
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
                <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Size</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Quantity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={`${product.id}-${product.size}`}>
                  <td className="border border-gray-300 px-4 py-2 flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover mr-4 rounded"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">{product.size}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {product.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    ${(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveFromCart(product.id, product.size)}
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
            <div className="flex space-x-4">
              <button
                onClick={handlePurchase}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
              >
                Purchase
              </button>
              <button
                onClick={goToShop}
                className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Purchase Successful!</h2>
            <p className="text-gray-700 mb-4">Thank you for your purchase. Your cart has been cleared.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmPurchase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Confirm Purchase</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to proceed with this purchase?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmClearCart}
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmPurchase(false)}
                className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
