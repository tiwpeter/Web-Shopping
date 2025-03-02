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
              <ul className="li-content" key={category.parent_name}>
                {/* ใช้ ul สำหรับรายการ */}
                <Link
                  href={`/pages/Category/${category.parent_name}`} // ใช้ category_id เพื่อไปยังหน้าหมวดหมู่สินค้าตาม id
                  className="link-cate custom "
                >
                  <li className="common-img categories-image img-w100p">
                    <img
                      src="https://cdn.pixabay.com/photo/2023/09/13/07/29/ghost-8250317_640.png" // ใช้ parent_image_url จาก API
                      alt="img" // ใช้ parent_name เป็น alt
                    />
                  </li>
                  {/*text */}
                  <li className="cate-name">
                    <p className="text two-line-clamp">
                      {category.parent_name} {/* แสดงชื่อ parent_name */}
                    </p>
                  </li>
                </Link>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
