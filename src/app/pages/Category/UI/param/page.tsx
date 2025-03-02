"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // ใช้ usePathname จาก next/navigation
import "./catedetal.css";
import "./font.css";
import "./tick.css";
import "./seah.css";
import "./rating.css";
import "./sort.css";
import "./sort2.css";
import "./nav2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Category() {
  const pathname = usePathname(); // ดึง path ของ URL
  const category = pathname
    ? decodeURIComponent(pathname.split("/").pop()!)
    : ""; // ดึง category จาก URL path
  const [categories, setCategories] = useState<any[]>([]); // สำหรับจัดเก็บหมวดหมู่
  const [loading, setLoading] = useState<boolean>(true); // สำหรับโหลดข้อมูล
  const [error, setError] = useState<string>(""); // สำหรับจัดการข้อผิดพลาด

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

  return (
    <section>
      <div className="wenbo">
        <ul className="wfg">
          <li className="sug lpwq">
            <a href="#" className="sug-a lpwq">
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
              <h4 className="fmaly">Mobile</h4>
            </div>
          </div>

          {/* Sidebar Category List */}
          <div className="boxing">
            <div id="uibox">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : filteredCategories.length === 0 ? (
                <p>No categories found for this selection.</p>
              ) : (
                filteredCategories.map((category: any) => (
                  <div key={category.id}>
                    <h4>{category.parent_category}</h4>
                    <div>
                      <div className="box-container category">
                        <span>{category.category_name}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="main-content">
          <div className="flex">
            <div>
              <h2>{category}</h2> {/* แสดงชื่อของ parent_category */}
              <h5 className="gray">
                Showing results for {category || "All Products"}
              </h5>{" "}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
