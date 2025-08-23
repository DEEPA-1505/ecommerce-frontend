// import { Fragment, useEffect, useState } from "react"
// import ProductCard from "../components/ProductCard"
// import { useSearchParams } from "react-router-dom";


// export default function Home () {
//   const [products, setProducts] = useState([]);
//   const [searchParams, setSearchParams] = useSearchParams()

//   useEffect(() => {
//     // fetch(import.meta.env.VITE_API_URL +'/products')
//     fetch("http://localhost:8000/api/v1/products?"+searchParams)

    

//     .then(res => res.json())
//     .then(res => setProducts(res.products))
//   },[searchParams])

//     return <Fragment>
         

//     <h1 id="products_heading" className="text-center">Latest Products</h1>

//     <section id="products" className="container mt-5">
//       <div className="row">
//         {/* {products.map(product => <ProductCard />)} */}
//         {/* {products.map(product => (
//   <ProductCard key={product._id || product.id} product={product} />
// ))} */}
//          {products.map((product, index) => (
//   <ProductCard key={product._id} product={product} index={index} />
// ))}

        
        
           
//       </div>
//        </section>

   
//     </Fragment>

// }    


import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/v1/products?${searchParams.toString()}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <Fragment>
      <h1 id="products_heading" className="text-center">
        Latest Products
      </h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </div>
      </section>
    </Fragment>
  );
}









        

        