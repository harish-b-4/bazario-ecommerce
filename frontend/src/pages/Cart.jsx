import { useCart } from "../context/CartContext";
import formatPrice from "../utils/formatPrice";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useCart();

  const cartItems = cart?.items || [];

  // ✅ Filter out items with null products and calculate total
  const validCartItems = cartItems.filter(item => item.product !== null);

  const totalPrice = validCartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  if (loading) return <Loader />;

  if (validCartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-10 px-4">
          <div className="mb-6">
            <FaShoppingCart className="mx-auto h-24 w-24 text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Start adding some products to your cart!</p>
          <Link 
            to="/products" 
            className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-800">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {validCartItems.map((item) => (
              <div
                key={item.product._id}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Mobile Layout */}
                <div className="flex gap-3 sm:gap-4">
                  {/* Product Image */}
                  <Link to={`/products/${item.product._id}`} className="flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/products/${item.product._id}`}
                      className="font-semibold text-sm sm:text-lg hover:text-purple-600 transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    
                    <p className="text-gray-600 text-sm md:text-xl mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                    
                    <p className="text-gray-500 text-sm md:text-lg mt-1">
                      Subtotal : {formatPrice(item.product.price * item.quantity)}
                    </p>

                    {/* Mobile Quantity Controls & Delete */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, Math.max(1, item.quantity - 1))
                          }
                          disabled={item.quantity <= 1}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 font-semibold text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                          className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeFromCart(item.product._id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Remove item"
                      >
                        <FaTrash className="text-sm sm:text-base" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Items ({validCartItems.length})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-purple-600">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-gradient-to-r from-[#0af02c] via-green-600 to-[#0af02c] text-white text-center px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 text-sm sm:text-base"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/products"
                className="block w-full text-center text-purple-600 hover:text-purple-700 mt-4 font-medium text-sm sm:text-base"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;