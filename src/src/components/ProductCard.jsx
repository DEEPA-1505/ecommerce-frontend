import { Link } from "react-router-dom";

export default function ProductCard({ product, index }) {
  // Function to generate colorful placeholder images
  const getColorfulImage = (index) => {
    const colors = [
      'from-pink-400 to-purple-500',
      'from-blue-400 to-cyan-500',
      'from-green-400 to-emerald-500',
      'from-yellow-400 to-orange-500',
      'from-red-400 to-pink-500',
      'from-indigo-400 to-purple-500',
      'from-teal-400 to-blue-500'
    ];
    
    const icons = [
      '🛍️', '📱', '💻', '🎧', '👕', '👟', '👜'
    ];
    
    return (
      <div className={`w-full h-48 rounded-lg bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center text-6xl shadow-lg`}>
        <span className="drop-shadow-lg">{icons[index % icons.length]}</span>
      </div>
    );
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="card group">
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg">
            {getColorfulImage(index)}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h5 className="text-lg font-semibold text-gray-800 line-clamp-2">
            <Link 
              to={"/product/" + index}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {product?.name || "Product Name"}
            </Link>
          </h5>

          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < (product?.ratings || 0) ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-2">({product?.ratings || 0})</span>
          </div>

          <p className="text-xl font-bold text-blue-600">${product?.price || "245.67"}</p>

          <Link
            to={"/product/" + index}
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
