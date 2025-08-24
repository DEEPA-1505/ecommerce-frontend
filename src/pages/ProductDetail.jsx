
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export default function ProductDetail({cartItems, setCartItems}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

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

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  function addToCart() {
    // Check if item already exists in cart by comparing product name and other unique properties
    const itemExist = cartItems.find((item) => 
      item.product.name === product.name && 
      item.product.price === product.price
    );
    
    if (!itemExist) {
      const newItem = {product, qty, productIndex: parseInt(id), productName: product.name};
      setCartItems((state) => [...state, newItem]);
      setAddedToCart(true);
      setCartMessage('✅ Added to cart successfully!');
      setQty(1);
      
      // Hide the success message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
        setCartMessage('');
      }, 3000);
    } else {
      // Item already exists, show a different message
      setAddedToCart(true);
      setCartMessage('⚠️ Item already in cart!');
      setTimeout(() => {
        setAddedToCart(false);
        setCartMessage('');
      }, 3000);
    }
  }

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    </div>
  );

  return product && (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="p-8">
              <div className="relative group">
                <img
                  className="w-full h-auto max-h-96 object-contain rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  src={getProductImage(product)}
                  alt={product?.name || "Product"}
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', getProductImage(product));
                  }}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-gray-500 text-sm">Product ID: {product._id || id}</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product?.ratings || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 text-sm">({product?.ratings || 0} ratings)</span>
              </div>

              {/* Price */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-4xl font-bold text-blue-600 mb-6">${product.price}</p>

                {/* Quantity Selector */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      onClick={() => setQty(prev => Math.max(1, prev - 1))}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <input
                      type="number"
                      className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                      value={qty}
                      readOnly
                    />
                    
                    <button 
                      className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setQty(prev => prev + 1)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Cart Message */}
                {addedToCart && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    cartMessage.includes('✅') 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                  }`}>
                    <p className="font-medium">{cartMessage}</p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={addToCart}
                  disabled={product.stock == 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 mb-6 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Stock Status */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-700 font-medium">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Description:</h4>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
              
              {/* Seller */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-gray-700">
                  Sold by: <span className="font-semibold text-gray-900">{product.seller}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



