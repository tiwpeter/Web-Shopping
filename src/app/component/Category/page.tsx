"use client";
import React, { useState, useEffect } from "react"; // เพิ่ม useState และ useEffect
import "./cate.css";
import Link from "next/link"; // ใช้ Link สำหรับการทำลิงก์

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/type/parents")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="cate-container cate-pad cate-link">
      <div className="">
        <p className="header-tiel">Category</p>
        {/* mapCategory */}
        <div className="content">
          <div className="cate-content-ui">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/pages/Category/${category.parent_name}`}>
                  {category.parent_name}
                  <img src={category.parent_image_url} alt="" />
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
