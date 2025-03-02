"use client";
import React, { useEffect, useState } from "react";
import "./catedetal.css";
import "./font.css";
import "./tick.css";
import "./seah.css";
import "./rating.css";
import "./sort.css";
import "./sort2.css";
import "./nav2.css";

import CategoryPage from "./ca"; // Import CategoryPage component
import "@fortawesome/fontawesome-free/css/all.min.css";
import { usePathname } from "next/navigation"; // ใช้ usePathname จาก next/navigation

export default function Category() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedBrand, setSelectedBrand] = useState<string>(""); // หมวดหมู่ที่เลือก
  const [clickedCategory, setClickedCategory] = useState<string | null>(null); // หมวดหมู่ที่ถูกคลิก
  const pathname = usePathname(); // ดึง path ของ URL

  const category = pathname
    ? decodeURIComponent(pathname.split("/").pop()!)
    : "";

  // Fetch products on component mount
  // ดึงข้อมูลหมวดหมู่จาก API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/category"); // ใช้ URL ของ API
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        console.error("Error fetching categories:", error);
        setError("There was an error loading categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // กรองหมวดหมู่ตาม parent_category ที่ตรงกับ URL
  const filteredCategories = categories.filter(
    (item) => item.parent_category === category
  );

  // ดึงรายการหมวดหมู่จากข้อมูลที่ได้รับ
  const categories = Array.from(
    new Set(products.map((product) => product.category_name))
  );

  const handleCategorySelect = (category: string) => {
    setSelectedBrand(category);
    setClickedCategory(category); // ตั้งค่า category ที่ถูกคลิก
  };

  return (
    <section>
      <div className="wenbo">
        <ul className="wfg">
          <li className="sug lpwq">
            <a href="" className="sug-a lpwq">
              <span>Lighting & Décor</span>
            </a>
          </li>
          <li className="sug">
            <span className="sug-a">Décor</span>
          </li>
        </ul>
      </div>

      <div className="container">
        <div className="sidebar">
          <div style={{ fontSize: "8px", color: "#212121" }}>
            <h4>Category</h4>
            <div style={{ marginTop: "10px", paddingBottom: "20px" }}>
              <div>
                <h4 className="fmaly">Mobile</h4>
              </div>
            </div>
          </div>

          {/* Category List */}
          <div className="boxing">
            <div id="uibox">
              {loading ? (
                <p>Loading...</p>
              ) : (
                categories.map((category) => (
                  <div
                    key={category}
                    className={`box-container category ${
                      clickedCategory === category ? "clicked" : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="box">
                      {clickedCategory === category && (
                        <i
                          className="fas fa-check"
                          style={{ color: "#ee4d2d" }}
                        ></i>
                      )}
                    </div>
                    <div className="boxing">
                      <span>{category}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Price Filter and Rating Filter */}
          <h5>Price</h5>
          <div className="search">
            <input type="number" placeholder="ราคาต่ำสุด" />
            <input type="number" placeholder="ราคาสูงสุด" />
            <button className="play-icon" type="button"></button>
          </div>

          <h5>Rating</h5>
          <div className="rating">{/* Add rating filter code here */}</div>
        </div>

        {/* Main Content Section */}
        <div className="main-content">
          <div className="flex">
            <div>
              <h2>Mobile</h2>
              <h5 className="gray">
                Showing results for {selectedBrand || "All Products"}
              </h5>{" "}
              {/* แสดงหมวดหมู่ที่เลือก */}
            </div>
            {/* Sorting and View Options */}
            <div className="configcenter">
              <div className="sortBy">
                <h5>Sort By:</h5>
              </div>
              <div className="select">
                <select id="sortSelect" className="ant-select-selection-item">
                  <option value="default">เรียงตามค่าเริ่มต้น</option>
                  <option value="price-asc">ราคาต่ำสุด</option>
                  <option value="price-desc">ราคาสูงสุด</option>
                </select>
              </div>
            </div>
          </div>
          {/* Passing the selected brand to CategoryPage */}
          <div className="_17mcb">
            <section className="productcate grid-view">
              <CategoryPage selectedBrand={selectedBrand} products={products} />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
