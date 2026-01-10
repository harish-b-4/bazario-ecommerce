import { Link } from "react-router-dom";
import { FaStore, FaEnvelope, FaPhone, FaMapMarkerAlt, } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaStore className="text-3xl text-blue-500" />
              <h3 className="text-2xl font-bold text-white">Bazario</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your one-stop shop for quality products at amazing prices. Shop with confidence and enjoy fast delivery.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-blue-500">›</span> My Account
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
                <span className="text-sm  hover:text-white hover:cursor-pointer">
                  Dindigul,<br />
                  Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FaPhone className="text-blue-500 flex-shrink-0" />
                <a className="text-sm hover:text-white hover:cursor-pointer transition-color">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 hover:cursor-pointer">
                <FaEnvelope className="text-blue-500 flex-shrink-0" />
                <a className="text-sm hover:text-white transition-colors">
                  bazario@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 Bazario. All rights reserved.
            </p>



            <div className="flex gap-4 text-sm">
              <Link className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <span className="text-gray-400">|</span>
              <Link className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-gray-400">|</span>
              <Link className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;