"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use the router hook for navigation
import { useAuth } from "../../AuthContext"; // Use context to get user data
import "./product.css";
import "./rating.css";

const ProductAll = () => {
  const [products, setProducts] = useState([]); // State to hold all products
  const router = useRouter(); // Use router for navigation
  const { user } = useAuth(); // Use Auth context to get user info

  // Fetch products from the API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (response.ok) {
          const data = await response.json();
          console.log("Data received from server:", data); // เพิ่ม console.log เพื่อตรวจสอบข้อมูลที่ได้รับจาก server
          setProducts(data); // Update products state with fetched data
        } else {
          console.error("Failed to fetch products.");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsData();
  }, []); // Empty dependency array means this effect will run only once when the component mounts

  // Handle product click (redirect to product detail page)
  const handleProductClick = (id) => {
    router.push(`/products/${id}`); // Use router.push to navigate to the product detail page using the product ID
  };

  // Separate products by discount
  const discountedProducts = products.filter(
    (product) => product.discountPrice && product.discountPrice < product.price // Ensure discountPrice exists and is less than price
  );
  const nonDiscountedProducts = products.filter(
    (product) =>
      !product.discountPrice || product.discountPrice === product.price // Handle cases where discountPrice is missing or equal to price
  );

  // Function to format the 'sold' number
  const formatSold = (sold) => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(1)}k`; // Format numbers larger than 1000 as k
    }
    return sold;
  };

  return (
    <div className="flex" style={{ width: "1200px" }}>
      {/* Display non-discounted products */}
      <div className="non-discounted-products">
        {nonDiscountedProducts.length === 0 ? (
          <p>No non-discounted products available.</p>
        ) : (
          nonDiscountedProducts.map((product) => (
            <a
              key={product.id}
              className="box-procduct common-img"
              onClick={() => handleProductClick(product.id)} // Navigate to product detail on click
              style={{ cursor: "pointer" }}
            >
              <div className="product-item">
                <div style={{ width: "189px", height: "189px" }}>
                  <img
                    src={product.imageUrls[0]} // Display the first image from the product's image array
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="text-duct">
                  <div className="titile-duct two-line-clamp">
                    <p>{product.title}</p>
                  </div>
                  <div className="price-flex1">
                    <div className="price">฿{product.price}</div>
                  </div>
                  <span className="brHcE"></span>
                  <div>
                    <span className="ratingflex">
                      {/* Render Stars Dynamically */}
                      {Array.from({ length: 5 }, (_, index) => {
                        // Check if current index is less than the rating
                        return index < Math.round(product.rating) ? (
                          <i key={index} className="star"></i>
                        ) : (
                          <i
                            key={index}
                            className="star empty" // Add empty star for non-rated
                          ></i>
                        );
                      })}
                      <span className="ratingadjust">
                        <span className="sold">
                          ({formatSold(product.sold)}) sold
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductAll;
