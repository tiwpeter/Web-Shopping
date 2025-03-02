"use client";
import { usePathname } from "next/navigation"; // นำเข้า usePathname
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
  const [products, setProducts] = useState([]); // เก็บข้อมูลสินค้าที่ได้จาก API
  const [loading, setLoading] = useState(true); // สถานะการโหลดข้อมูล
  const [selectedCategories, setSelectedCategories] = useState({
    // สถานะสำหรับเลือกหมวดหมู่
    ximy: false,
    sumsung: false,
  });

  useEffect(() => {
    // ฟังก์ชันเพื่อดึงข้อมูลจาก API ตามหมวดหมู่ที่เลือก
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        setProducts(data); // เก็บข้อมูลทั้งหมด
        setLoading(false); // เปลี่ยนสถานะเป็นไม่โหลด
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts(); // เรียกฟังก์ชันเมื่อ component mount
  }, []);

  // ฟังก์ชันที่ใช้ในการจัดการการเลือกหมวดหมู่
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category]: !prevState[category], // สลับสถานะการเลือกหมวดหมู่
    }));
  };

  // ฟิลเตอร์สินค้าตามหมวดหมู่ที่ถูกเลือก
  const filteredProducts = products.filter((product) => {
    // หากไม่ได้เลือกหมวดหมู่ใดเลย ให้แสดงสินค้าทุกตัว
    if (!selectedCategories.ximy && !selectedCategories.sumsung) return true;

    // ถ้าเลือกหมวดหมู่ "ximy" หรือ "sumsung"
    if (selectedCategories.ximy && product.category_name === "ximy")
      return true;
    if (selectedCategories.sumsung && product.category_name === "sumsung")
      return true;

    return false;
  });

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (!filteredProducts || filteredProducts.length === 0) {
    return <p>No products found for the selected categories.</p>;
  }

  return (
    <div className="product-category-page">
      <h1>Products in Selected Categories</h1>
      {/* ปุ่มติ๊กสำหรับเลือกหมวดหมู่ */}
      <div className="category-filter">
        <label>
          <input
            type="checkbox"
            checked={selectedCategories.ximy}
            onChange={() => handleCategoryChange("ximy")}
          />
          Ximy
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedCategories.sumsung}
            onChange={() => handleCategoryChange("sumsung")}
          />
          Sumsung
        </label>
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrls[0]} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <div className="options">
              {product.options.map((option, index) => (
                <div key={index} className="option">
                  <p>
                    {option.option_name}: {option.option_value}
                  </p>
                  {option.image_url && (
                    <img src={option.image_url} alt={option.option_value} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
