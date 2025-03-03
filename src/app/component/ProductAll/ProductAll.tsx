"use client";
import React, { useEffect, useState } from "react";

// ฟังก์ชันแนะนำสินค้าตามคะแนนที่ได้รับ
const justForYou = (ratingThreshold, allProducts) => {
  console.log("🔍 สินค้าทั้งหมดก่อนกรอง:", allProducts);

  // ใช้ .flat() เพื่อทำให้ array ที่ซ้อนกันกลายเป็น array เดียว
  const flattenedProducts = allProducts.flat();
  console.log("📌 หลังจาก .flat():", flattenedProducts);

  const filteredProducts = flattenedProducts.filter(
    (product) => product.rating >= ratingThreshold
  );
  console.log("✅ สินค้าที่แนะนำ:", filteredProducts);

  return filteredProducts;
};

const formatToK = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
};

const ProductAll = () => {
  const [products, setProducts] = useState([]);
  const ratingThreshold = 4; // กำหนดให้แนะนำสินค้าที่มีคะแนน 4 ขึ้นไป

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/Product");
        const data = await response.json();

        console.log("🎯 ดึงข้อมูลสำเร็จ:", data);

        // ใช้ .flat() เพื่อแก้ปัญหาข้อมูลซ้อนกัน
        const recommendedProducts = justForYou(ratingThreshold, data);
        setProducts(recommendedProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex" style={{ width: "1200px" }}>
      <div className="non-discounted-products">
        {products.length > 0 ? (
          products.map((product) => (
            <a
              key={product.product_id}
              className="box-procduct common-img"
              style={{ cursor: "pointer" }}
            >
              {/* Product Item */}
              <div className="product-item">
                {/* Image */}
                <div style={{ width: "189px", height: "189px" }}>
                  <img
                    src={
                      product.product_images?.[1] ||
                      "https://via.placeholder.com/189"
                    } // ใช้ภาพแรก หรือ Placeholder ถ้าไม่มีภาพ
                    alt={product.product_name}
                    className="product-image"
                  />
                </div>
                {/* Text */}
                <div className="text-duct">
                  {/* Product Name */}
                  <div className="titile-duct two-line-clamp">
                    <p>{product.product_name}</p>
                  </div>
                  {/* Price */}
                  <div className="price-flex1">
                    <div className="price">฿{product.price}</div>
                  </div>
                  <span className="brHcE"></span>
                  <div>
                    {product.rating && (
                      <span className="ratingflex">
                        {Array.from({ length: 5 }, (_, index) =>
                          index < product.rating ? (
                            <i key={index} className="star"></i>
                          ) : (
                            <i key={index} className="star empty"></i>
                          )
                        )}
                        <span className="ratingadjust">
                          <span>({formatToK(product.rating)})</span>
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p>ไม่มีสินค้าที่แนะนำ</p>
        )}
      </div>
    </div>
  );
};

export default ProductAll;
