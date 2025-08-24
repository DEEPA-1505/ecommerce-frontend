
import { Link } from "react-router-dom";

// Create an images object using public folder paths
const images = {
  'img1.png': '/images/products/img1.png',
  'img2.png': '/images/products/img2.png',
  'img3.png': '/images/products/img3.png',
  'img4.png': '/images/products/img4.png',
  'img5.png': '/images/products/img5.png',
  'img6.png': '/images/products/img6.png',
  'img7.png': '/images/products/img7.png',
};

export default function ProductCard({ product, index }) {
  // Function to get the correct image based on product data
  const getProductImage = (productData) => {
    if (productData?.images?.[0]?.image) {
      const imageName = productData.images[0].image;
      
      // Get image from the images object
      const imageUrl = images[imageName];
      if (imageUrl) {
        return imageUrl;
      } else {
        return images['img1.png']; // fallback to first image
      }
    }
    return images['img1.png']; // fallback to first image
  };

  return (
    <div className="w-full animate-fade-in">
      <div className="card group">
        <div className="p-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              className="w-full h-48 object-cover rounded-lg mx-auto group-hover:scale-105 transition-transform duration-300"
              src={getProductImage(product)}
              alt={product?.name || "Product"}
            />
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




