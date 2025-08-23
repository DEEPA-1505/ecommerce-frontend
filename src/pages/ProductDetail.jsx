// export default  function ProductDetail () {
//     return  <div className="container container-fluid">
//         <div className="row f-flex justify-content-around">
//             <div className="col-12 col-lg-5 img-fluid" id="product_image">
//                 <img src="./images/products/3.jpg" alt="sdf" height="500" width="500"/>
//             </div>

//             <div className="col-12 col-lg-5 mt-5">
//                 <h3>Dell Inspiron 3511 Laptop, Intel i3-1115G4, 8GB, 512GB</h3>
//                 <p id="product_id">Product # 387874kkfjkf</p>

//                 <hr/>

//                 <div className="rating-outer">
//                     <div className="rating-inner"></div>
//                 </div>


//                 <hr/>

//                 <p id="product_price">$456.00</p>
//                 <div className="stockCounter d-inline">
//                     <span className="btn btn-danger minus">-</span>

//                     <input type="number" className="form-control count d-inline" value="1" readOnly />

//                     <span className="btn btn-primary plus">+</span>
//                 </div>
//                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

//                 <hr/>

//                 <p>Status: <span id="stock_status">In Stock</span></p>

//                 <hr/>

//                 <h4 className="mt-2">Description:</h4>
//                 <p>Processor: Intel i5-1235U (3.30 GHz up to 4.40 GHz), 10 Cores & 12MB Cache
//                     RAM & Storage: 8GB, 8Gx1, DDR4, 2666MHz Ach & 512GB SSD
//                     Display & Graphics: 15.6" FHD WVA AG 120Hz 250 nits Narrow Border & Integrated Graphics</p>
//                 <hr/>
//                 <p id="product_seller mb-3">Sold by: <strong>Amazon</strong></p>

//                 <div className="rating w-50"></div>

//             </div>

//         </div>

//     </div>

// }



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/v1/product/${id}`)
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

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.name}
            height="500"
            width="500"
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product # {product._id}</p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings || 0) * 20}%` }}
            ></div>
          </div>

          <hr />

          <p id="product_price">${product.price}</p>

          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus">-</span>
            <input
              type="number"
              className="form-control count d-inline"
              value="1"
              readOnly
            />
            <span className="btn btn-primary plus">+</span>
          </div>

          <button
            type="button"
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status:{" "}
            <span id="stock_status">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
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



