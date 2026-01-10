// FILE: frontend/src/components/ProductCard.jsx

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import formatPrice from "../utils/formatPrice";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product._id, 1);
  };

  return (
    <div className="border rounded-lg shadow-sm  hover:shadow-md transition">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-contain rounded-t-lg "
        />
      </Link>

      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
        </Link>

        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">
            {formatPrice(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition-colors duration-200 text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
