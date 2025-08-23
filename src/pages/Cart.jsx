import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from "../assets/images/products/img1.png";
import img2 from "../assets/images/products/img2.png";
import img3 from "../assets/images/products/img3.png";
import img4 from "../assets/images/products/img4.png";
import img5 from "../assets/images/products/img5.png";
import img6 from "../assets/images/products/img6.png";
import img7 from "../assets/images/products/img7.png";

export default function Cart({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [productIndices, setProductIndices] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');
    const [processingOrder, setProcessingOrder] = useState(false);

    // Function to get the correct image based on product data
    const getProductImage = (productData) => {
        if (productData?.images?.[0]?.image) {
            const imageName = productData.images[0].image;
            // Map image names to imported images
            switch (imageName) {
                case 'img1.png': return img1;
                case 'img2.png': return img2;
                case 'img3.png': return img3;
                case 'img4.png': return img4;
                case 'img5.png': return img5;
                case 'img6.png': return img6;
                case 'img7.png': return img7;
                default: return img1; // fallback to first image
            }
        }
        return img1; // fallback to first image
    };

    // Function to find the correct product index by name
    const findProductIndexByName = async (productName) => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/products');
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
                const response = await fetch('http://localhost:8000/api/v1/products');
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
            <div className="container container-fluid text-center mt-5">
                <h2>Your Cart is Empty</h2>
                <p>Add some products to your cart to see them here.</p>
                <Link to="/" className="btn btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Show loading if product indices are not yet loaded
    if (Object.keys(productIndices).length === 0) {
        return (
            <div className="container container-fluid text-center mt-5">
                <h2>Loading Cart...</h2>
                <p>Please wait while we prepare your cart.</p>
            </div>
        );
    }

    // Debug: Log cart items and product indices
    console.log('Cart items:', cartItems);
    console.log('Product indices:', productIndices);

    return (
        <div className="container container-fluid">
            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
            
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">
                    <hr />
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="row">
                                <div className="col-4 col-lg-3">
                                    <img 
                                        src={getProductImage(item.product)} 
                                        alt={item.product.name} 
                                        height="90" 
                                        width="115"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="col-5 col-lg-3">
                                    <Link 
                                        to={`/product/${productIndices[item.product.name] !== undefined ? productIndices[item.product.name] : item.productIndex || index}`}
                                        style={{ 
                                            color: '#007bff', 
                                            textDecoration: 'none',
                                            fontWeight: '500'
                                        }}
                                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                        onClick={() => {
                                            const productIndex = productIndices[item.product.name] !== undefined ? productIndices[item.product.name] : item.productIndex || index;
                                            console.log(`Clicking ${item.product.name}, going to product ${productIndex}`);
                                        }}
                                    >
                                        {item.product.name}
                                    </Link>
                                </div>

                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p id="card_item_price">${item.product.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div className="stockCounter d-inline">
                                        <span 
                                            className="btn btn-danger minus" 
                                            onClick={() => updateQuantity(index, item.qty - 1)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            -
                                        </span>
                                        <input 
                                            type="number" 
                                            className="form-control count d-inline" 
                                            value={item.qty} 
                                            readOnly 
                                        />
                                        <span 
                                            className="btn btn-primary plus" 
                                            onClick={() => updateQuantity(index, item.qty + 1)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            +
                                        </span>
                                    </div>
                                </div>

                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                    <button 
                                        onClick={() => removeFromCart(index)}
                                        className="btn btn-danger"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal: <span className="order-summary-values">{subtotal} (Units)</span></p>
                        <p>Est. total: <span className="order-summary-values">${total.toFixed(2)}</span></p>
                        <hr />
                        
                        {/* Order Message Display */}
                        {orderMessage && (
                            <div className={`alert ${orderMessage.includes('✅') ? 'alert-success' : 'alert-warning'}`} role="alert">
                                {orderMessage}
                                {orderMessage.includes('✅') && (
                                    <div className="mt-2">
                                        <small>Redirecting to home page in a few seconds...</small>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <button 
                            id="checkout_btn" 
                            className="btn btn-primary btn-block"
                            onClick={handlePlaceOrder}
                            disabled={orderPlaced || processingOrder}
                        >
                            {processingOrder ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processing...
                                </>
                            ) : orderPlaced ? (
                                'Order Placed!'
                            ) : (
                                'Place Order'
                            )}
                        </button>
                        
                        {/* Continue Shopping Button */}
                        {orderPlaced && (
                            <Link to="/" className="btn btn-outline-primary btn-block mt-2">
                                Continue Shopping
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}