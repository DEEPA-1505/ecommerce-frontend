
import img1 from "../assets/images/products/img1.png";
import img2 from "../assets/images/products/img2.png";
import img3 from "../assets/images/products/img3.png";
import img4 from "../assets/images/products/img4.png";
import img5 from "../assets/images/products/img5.png";
import img6 from "../assets/images/products/img6.png";
import img7 from "../assets/images/products/img7.png";
import { Link } from "react-router-dom";

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7];

export default function ProductCard({ product, index }) {
  // Use the index to pick a consistent fallback image
  const fallbackImg = fallbackImages[index % fallbackImages.length];

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={product?.images?.[0]?.image || fallbackImg}
          alt={product?.name || "Product"}
          onError={(e) => (e.target.src = fallbackImg)} // fallback if broken URL
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={"/product/" + product._id}>
              {product?.name || "Product Name"}
            </Link>
          </h5>

          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product?.ratings || 0) / 5 * 100}%` }}
              ></div>
            </div>
          </div>

          <p className="card-text">${product?.price || "245.67"}</p>

          <Link
            to={"/product/" + product._id}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}




