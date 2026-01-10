import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import formatPrice from "../utils/formatPrice";
import Loader from "../components/Loader";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      alert("Please fill in all shipping details");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod: "COD",
      });

      clearCart();
      alert("Order placed successfully!");
      navigate("/account");
    } catch (error) {
      alert(error.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <form onSubmit={handleOrder} className="space-y-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border p-3 rounded"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Placing Order..." : "Place Order (COD)"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="border rounded p-4 space-y-3">
            {cartItems.map((item) => (
              <div key={item.product._id} className="flex justify-between text-sm">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              Payment Method: Cash on Delivery (COD)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;