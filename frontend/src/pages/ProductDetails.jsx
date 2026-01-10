// FILE: frontend/src/pages/ProductDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
import formatPrice from "../utils/formatPrice";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product._id, quantity);
  };

  if (loading) return <Loader />;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-96 object-contain rounded-lg"
        />

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-2xl font-semibold text-green-500 mb-4">
            {formatPrice(product.price)}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>

            <div className="flex items-center border rounded">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
