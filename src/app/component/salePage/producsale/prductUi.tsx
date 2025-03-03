"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use the router hook for navigation
import { useAuth } from "../../AuthContext"; // Use context to get user data
import "./product.css";
import "./rating.css";

const ProductUi = () => {
  const [products, setProducts] = useState([]); // State to hold all products
  const router = useRouter(); // Use router for navigation
  const { user } = useAuth(); // Use Auth context to get user info
  const [rating] = useState(1331); // ตัวอย่างการใช้ useState เพื่อเก็บจำนวนรีวิว

  // Fetch products from the API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (response.ok) {
          const data = await response.json();
          // Ensure that data.products is an array before setting it
          if (Array.isArray(data.products)) {
            setProducts(data.products); // Update products state with fetched data
          } else {
            console.error("Expected an array of products, but got:", data);
            setProducts([]); // Fallback to an empty array if data.products is not an array
          }
        } else {
          console.error("Failed to fetch products.");
          setProducts([]); // Fallback to an empty array if the fetch fails
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to an empty array in case of error
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
    (product) =>
      product.discount_price && product.discount_price < product.price // Ensure discount_price exists and is less than price
  );
  const nonDiscountedProducts = products.filter(
    (product) =>
      !product.discount_price || product.discount_price === product.price // Handle cases where discount_price is missing or equal to price
  );

  return (
    <div className="flex productshow" style={{ width: "1200px" }}>
      {/* Display user information if logged in */}
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.name}</p>
        </div>
      ) : (
        <div className="user-info">
          <p>Loading user information...</p>
        </div>
      )}

      {/* Display discounted products */}
      <div className="discounted-products">
        <h2>สินค้าที่ลดราคา</h2>
        {discountedProducts.length === 0 ? (
          <p>No discounted products available.</p>
        ) : (
          discountedProducts.map((product) => (
            <a
              key={product.id}
              className="box-procduct common-img"
              onClick={() => handleProductClick(product.id)} // Navigate to product detail on click
              style={{ cursor: "pointer" }}
            >
              <div className="product-item">
                <div style={{ width: "189px", height: "189px" }}>
                  <img
                    src={product.images[0]} // Display the first image from the product's image array
                    alt={product.title}
                    className="product-image"
                  />
                </div>
                <div className="text-duct">
                  <div className="titile-duct two-line-clamp">
                    <p>{product.title}</p>
                  </div>
                  <div className="price-flex1">
                    <div className="price">฿{product.discount_price}</div>
                  </div>
                  <div className="origin-price">
                    <div className="origin-price-main">
                      <div className="currency">฿</div>
                      <div className="price">{product.price}</div>
                    </div>
                    <span className="discount">
                      -
                      {Math.round(
                        ((product.price - product.discount_price) /
                          product.price) *
                          100
                      )}
                      %
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

export default ProductUi;
