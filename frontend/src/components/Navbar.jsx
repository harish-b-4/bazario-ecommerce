import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart, FaUser, FaSignOutAlt,FaShoppingBag,FaSignInAlt,FaUserPlus,FaStore,FaHome} from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItemsCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-blue-900 md:bg-white md:border-b md:border-gray-200 shadow-md sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:mx-14">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold text-white md:text-blue-700 flex items-center gap-1 md:gap-0 hover:opacity-80 transition-opacity" 
              onClick={closeMenu}
            >
              <img className="w-8 md:w-10 bg-white rounded-full" src="./B-letter.png" alt="Icon" />
              <span className="text-2xl md:text-3xl">azario</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 flex items-center gap-2 transition-all" 
                    : "text-gray-700 hover:text-blue-700 flex items-center gap-2 transition-all"
                }
              > 
                <FaHome className="text-lg"/>
                Home
              </NavLink>

              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  isActive 
                    ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 flex items-center gap-2 transition-all" 
                    : "text-gray-700 hover:text-blue-700 flex items-center gap-2 transition-all"
                }
              > 
                <FaShoppingBag className="text-lg"/>
                Products
              </NavLink>

              {/* User logged in */}
              {user && (
                <>
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      isActive
                        ? "relative text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 flex items-center gap-2 transition-all"
                        : "relative text-gray-700 hover:text-blue-700 flex items-center gap-2 transition-all"
                    }
                  >
                    <FaShoppingCart className="text-lg"/>
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                        {cartItemsCount}
                      </span>
                    )}
                  </NavLink>

                  <NavLink
                    to="/account"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 flex items-center gap-2 transition-all"
                        : "text-gray-700 hover:text-blue-700 flex items-center gap-2 transition-all"
                    }
                  >
                    <FaUser className="text-lg"/>
                    Account
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                  >
                    <FaSignOutAlt/>
                    Logout
                  </button>
                </>
              )}

              {/* Guest */}
              {!user && (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-700 font-semibold border-b-2 border-blue-700 pb-1 flex items-center gap-2 transition-all"
                        : "text-gray-700 hover:text-blue-700 flex items-center gap-2 transition-all"
                    }
                  >
                    <FaSignInAlt className="text-lg"/>
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 font-medium flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                  >
                    <FaUserPlus/>
                    Register
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-400 focus:outline-none p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? 
                  <FaTimes className="h-6 w-6" />
                 : 
                  <FaBars className="h-6 w-6" />
                }
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Menu - Slide from Right */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 bg-blue-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-900">
          <div className="flex items-center gap-2 text-white">
            <FaStore className="text-2xl" />
            <span className="text-xl font-bold">Menu</span>
          </div>
          <button
            onClick={closeMenu}
            className="text-white hover:text-gray-400 p-2"
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto h-full pb-20">
          <div className="px-4 pt-4 pb-4 space-y-2">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg"
                    : "text-white hover:bg-blue-500"
                }`
              }
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/products"
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg"
                    : "text-white hover:bg-blue-500"
                }`
              }
            >
              <FaShoppingBag className="text-lg" />
              <span>Products</span>
            </NavLink>

            {/* User logged in */}
            {user && (
              <>
                <NavLink
                  to="/cart"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg"
                        : "text-white hover:bg-blue-500"
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <FaShoppingCart className="text-lg" />
                    <span>Cart</span>
                  </span>
                  {cartItemsCount > 0 && (
                    <span className="bg-yellow-400 text-black text-xs px-2.5 py-1 rounded-full font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </NavLink>

                <NavLink
                  to="/account"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg"
                        : "text-white hover:bg-blue-500"
                    }`
                  }
                >
                  <FaUser className="text-lg" />
                  <span>Account</span>
                </NavLink>

                {/* User Info Display */}
                <div className="px-4 py-3 text-sm text-white border-t border-blue-600 mt-2 flex items-start gap-3 bg-blue-600 rounded-md">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full">
                    <FaUser className="text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">{user?.name}</p>
                    <p className="text-xs text-blue-200">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium bg-white text-black hover:bg-gray-200 transition-colors"
                >
                  <FaSignOutAlt className="text-lg" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Guest */}
            {!user && (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-lg"
                        : "text-white hover:bg-blue-500"
                    }`
                  }
                >
                  <FaSignInAlt className="text-lg" />
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-white text-blue-700 shadow-lg border-2 border-white"
                        : "bg-white text-blue-700 hover:bg-gray-300"
                    }`
                  }
                >
                  <FaUserPlus className="text-lg" />
                  <span>Register</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;