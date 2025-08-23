
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../assets/images/products/img1.png";
import img2 from "../assets/images/products/img2.png";
import img3 from "../assets/images/products/img3.png";
import img4 from "../assets/images/products/img4.png";
import img5 from "../assets/images/products/img5.png";
import img6 from "../assets/images/products/img6.png";
import img7 from "../assets/images/products/img7.png";

export default function ProductDetail({cartItems, setCartItems}) {
     

  const { id } = useParams(); // Get product ID from URL
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

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  
  return  product && (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img
            src={getProductImage(product)}
            alt={product.name}
            height="500"
            width="500"
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id || id}</p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
            //   style={{ width: `${(product.ratings || 0) * 20}%` }}
            style={{ width: `${(product?.ratings || 0) / 5 * 100}%` }}
            ></div>
          </div>

          <hr />

          <p id="product_price">${product.price}</p>

          <div className="stockCounter d-inline">
            <span 
              className="btn btn-danger minus"
              onClick={() => setQty(prev => Math.max(1, prev - 1))}
              style={{ cursor: 'pointer' }}
            >
              -
            </span>
           

            <input
              type="number"
              className="form-control count d-inline"
              value={qty}
              readOnly
            />
            <span 
              className="btn btn-primary plus" 
             
              onClick={() => setQty(prev => prev + 1)}
              style={{ cursor: 'pointer' }}
            >
              +
            </span>
             
            
             
            
          </div>

          {addedToCart && (
            <div className={`alert mt-2 ${cartMessage.includes('✅') ? 'alert-success' : 'alert-warning'}`} role="alert">
              {cartMessage}
            </div>
          )}

          <button
            type="button"
            onClick={addToCart}
            disabled={product.stock == 0}
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status:{" "}
            <span id="stock_status" className={product.stock > 0 ?'text-success':'text-danger'}>{product.stock > 0  ?'In Stock' : 'Out of Stock'}
               
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>
          <hr />
          <p id="product_seller mb-3">
            Sold by: <strong>{product.seller}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}



