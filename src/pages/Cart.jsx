import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [productIndices, setProductIndices] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    const [processingOrder, setProcessingOrder] = useState(false);

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

    // Function to find the correct product index by name
    const findProductIndexByName = async (productName) => {
        try {
            const response = await fetch('https://ecommerce-backend-production-749c.up.railway.app/api/v1/products');
            const data = await response.json();
            if (data.success) {
                const productIndex = data.products.findIndex(p => p.name === productName);
                return productIndex >= 0 ? productIndex : 0;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        return 0; // fallback
    };

    // useEffect to fetch product indices when component mounts
    useEffect(() => {
        const fetchProductIndices = async () => {
            try {
                const response = await fetch('https://ecommerce-backend-production-749c.up.railway.app/api/v1/products');
                const data = await response.json();
                if (data.success) {
                    const indices = {};
                    data.products.forEach((product, index) => {
                        indices[product.name] = index;
                    });
                    console.log('Product indices:', indices);
                    setProductIndices(indices);
                }
            } catch (error) {
                console.error('Error fetching product indices:', error);
            }
        };

        fetchProductIndices();
    }, []);

    // Function to update quantity
    const updateQuantity = (index, newQty) => {
        if (newQty < 1) return;
        const updatedCart = [...cartItems];
        updatedCart[index].qty = newQty;
        setCartItems(updatedCart);
    };

    // Function to remove item from cart
    const removeFromCart = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
    };

    // Function to clear entire cart
    const clearCart = () => {
        const confirmClear = window.confirm('Are you sure you want to clear your entire cart?');
        if (confirmClear) {
            setCartItems([]);
        }
    };

    // Function to place order
    const handlePlaceOrder = () => {
        if (cartItems.length === 0) {
            setOrderMessage('⚠️ Your cart is empty!');
            return;
        }

        // Show confirmation dialog
        const confirmOrder = window.confirm(
            `Are you sure you want to place this order?\n\nTotal: $${total.toFixed(2)}\nItems: ${subtotal}\n\nClick OK to confirm your order.`
        );

        if (confirmOrder) {
            // Show processing state
            setProcessingOrder(true);
            
            // Simulate order processing delay
            setTimeout(() => {
                setProcessingOrder(false);
                setOrderPlaced(true);
                setOrderMessage('✅ Order placed successfully! Thank you for your purchase.');
                
                // Clear the cart after successful order and redirect to home
                setTimeout(() => {
                    setCartItems([]);
                    setOrderPlaced(false);
                    setOrderMessage('');
                    navigate('/'); // Redirect to home page
                }, 3000);
            }, 1500); // 1.5 second processing delay
        }
    };

    // Calculate totals
    const subtotal = cartItems.reduce((total, item) => total + item.qty, 0);
    const total = cartItems.reduce((total, item) => total + (item.product.price * item.qty), 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-gray-400 mb-6">
                        <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
                    <Link to="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    // Show loading if product indices are not yet loaded
    if (Object.keys(productIndices).length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Cart...</h2>
                    <p className="text-gray-600">Please wait while we prepare your cart.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                Your Cart: <span className="text-blue-600">{cartItems.length} items</span>
                            </h2>
                            <p className="text-gray-600 mt-2">Review your items and proceed to checkout</p>
                        </div>
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800 font-medium transition-colors duration-200 flex items-center space-x-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span>Clear Cart</span>
                        </button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="space-y-6">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                        <div className="grid grid-cols-12 gap-4 items-center">
                                            {/* Product Image */}
                                            <div className="col-span-4 lg:col-span-3">
                                                <div className="relative group">
                                                    <img
                                                        className="w-full h-24 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                        src={getProductImage(item.product)}
                                                        alt={item.product?.name || "Product"}
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Name */}
                                            <div className="col-span-5 lg:col-span-3">
                                                <Link 
                                                    to={`/product/${productIndices[item.product.name] !== undefined ? productIndices[item.product.name] : item.productIndex || index}`}
                                                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors duration-200"
                                                >
                                                    {item.product.name}
                                                </Link>
                                            </div>

                                            {/* Price */}
                                            <div className="col-span-3 lg:col-span-2">
                                                <p className="text-lg font-semibold text-gray-900">${item.product.price}</p>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="col-span-4 lg:col-span-3">
                                                <div className="flex items-center space-x-2">
                                                    <button 
                                                        className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                        onClick={() => updateQuantity(index, item.qty - 1)}
                                                    >
                                                        -
                                                    </button>
                                                    <input 
                                                        type="number" 
                                                        className="w-16 h-8 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold"
                                                        value={item.qty} 
                                                        readOnly 
                                                    />
                                                    <button 
                                                        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                        onClick={() => updateQuantity(index, item.qty + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <div className="col-span-4 lg:col-span-1">
                                                <button 
                                                    onClick={() => removeFromCart(index)}
                                                    className="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h4 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h4>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-semibold text-gray-900">{subtotal} (Units)</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 text-lg">Total:</span>
                                        <span className="font-bold text-2xl text-blue-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Order Message Display */}
                            {orderMessage && (
                                <div className={`mb-6 p-4 rounded-lg ${
                                    orderMessage.includes('✅') 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}>
                                    <p className="font-medium">{orderMessage}</p>
                                    {orderMessage.includes('✅') && (
                                        <p className="text-sm mt-2 opacity-75">
                                            Redirecting to home page in a few seconds...
                                        </p>
                                    )}
                                </div>
                            )}
                            
                            {/* Place Order Button */}
                            <button 
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 mb-4 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:transform-none"
                                onClick={handlePlaceOrder}
                                disabled={orderPlaced || processingOrder}
                            >
                                {processingOrder ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </div>
                                ) : orderPlaced ? (
                                    'Order Placed!'
                                ) : (
                                    'Place Order'
                                )}
                            </button>
                            
                            {/* Continue Shopping Button */}
                            <Link to="/" className="block w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-4 px-6 rounded-lg text-center transition-all duration-200">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}