// FILE: frontend/src/pages/Home.jsx

import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <div className="bg-gray-50 min-h-screen">
        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 py-3">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-white text-center font-medium text-sm md:text-base">
              🎉 Up To 35% Off For First 30 Customers - Limited Time Offer!
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
            Welcome to <span className="text-blue-700">Bazario</span>
          </h1>
          <p className="text-gray-600 mb-10 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Your premium destination for quality products at unbeatable prices. Shop with confidence and style.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-10 py-5 rounded-lg text-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105"
          >
            Explore Collection →
          </Link>
        </section>

        {/* Category Cards Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">💻</div>
                  <h3 className="text-3xl font-bold mb-2">Electronics</h3>
                  <p className="text-blue-100">Latest tech gadgets</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>

            <Link to="/products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-pink-500 to-purple-700 h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🧥</div>
                  <h3 className="text-3xl font-bold mb-2">Fashion</h3>
                  <p className="text-pink-100">Trending styles</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>

            <Link to="/products" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="bg-gradient-to-br from-green-500 to-teal-700 h-64 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-3xl font-bold mb-2">Home & Living</h3>
                  <p className="text-green-100">Cozy essentials</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </Link>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-white py-20 mt-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Why Shop With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6 hover:transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">🚚</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Free Shipping</h3>
                <p className="text-gray-600">On all orders over $50. Fast and reliable delivery to your doorstep.</p>
              </div>

              <div className="text-center p-6 hover:transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">🔒</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Secure Payment</h3>
                <p className="text-gray-600">Your transactions are 100% safe with encrypted checkout.</p>
              </div>

              <div className="text-center p-6 hover:transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">↩️</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Easy Returns</h3>
                <p className="text-gray-600">10-day hassle-free return policy for your peace of mind.</p>
              </div>

              <div className="text-center p-6 hover:transform hover:scale-105 transition-transform duration-300">
                <div className="text-6xl mb-4">⭐</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">Top Quality</h3>
                <p className="text-gray-600">Curated products that meet our high quality standards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Ready to Start Shopping?
          </h2>
          <p className="text-gray-600 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover amazing deals today.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-12 py-5 rounded-lg text-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-2xl hover:scale-105"
          >
            Browse All Products →
          </Link>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;