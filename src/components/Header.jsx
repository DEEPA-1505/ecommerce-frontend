import Search from './Search';
import { Link } from 'react-router-dom';

export default function Header({cartItems}) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                E-Commerce
              </div>
            </Link>
          </div>
      
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <Search />
          </div>
      
          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart"
              className="relative flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="font-medium hidden sm:inline text-blue-600">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}