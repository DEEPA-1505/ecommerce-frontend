
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

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src={getProductImage(product)}
          alt={product?.name || "Product"}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={"/product/" + index}>
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
            to={"/product/" + index}
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




