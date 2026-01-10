import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import formatPrice from "../utils/formatPrice";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/orders/my");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* User Info */}
      <div className="border p-6 rounded mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <p className="mb-2">
          <strong>Name:</strong> {user?.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user?.email}
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My Orders</h2>

        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="text-center py-10 border rounded">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
            <Link to="/products" className="text-blue-600 underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      {formatPrice(order.totalAmount)}
                    </p>
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {order.shippingAddress && (
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                    <strong>Shipping Address:</strong> {order.shippingAddress.address || order.shippingAddress}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;