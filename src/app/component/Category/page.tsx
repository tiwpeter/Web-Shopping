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
      <div className="header-text">
        <p className="header-tiel">Category</p>
      </div>
      {/*content */}
      <div className="content">
        <div className="cate-content-ui">
          {categories.map((category) => (
            <div className="li-content" key={category.id}>
              <Link href={`/pages/Category/${category.parent_name}`}>
                <div className="link-cate custom">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="common-img categories-image img-w100p">
                      <img
                        src={category.parent_image_url} // ใช้ parent_image_url จาก API
                        alt={category.parent_name} // ใช้ parent_name เป็น alt
                      />
                    </div>
                  </div>
                  <div className="cate-name">
                    <p className="text two-line-clamp">
                      {category.parent_name} {/* แสดงชื่อ parent_name */}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
