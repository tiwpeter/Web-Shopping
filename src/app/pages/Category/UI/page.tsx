"use client";
import React, { useEffect, useState } from "react";
import "./nav2.css";

import CategoryPage from "./ca"; // Import CategoryPage component
import "@fortawesome/fontawesome-free/css/all.min.css";
import { usePathname } from "next/navigation"; // Use usePathname from next/navigation

export default function Category() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Store selected category
  const [categories, setCategories] = useState<any[]>([]); // Store categories
  const pathname = usePathname(); // Get current URL path
  const category = pathname
    ? decodeURIComponent(pathname.split("/").pop()!)
    : ""; // Get category from URL

  // Fetch categories and products
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await fetch(
          "http://localhost:3001/api/category"
        );
        if (!categoryResponse.ok) throw new Error("Error fetching categories");
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const productResponse = await fetch(
          "http://localhost:3001/api/products"
        );
        if (!productResponse.ok) throw new Error("Error fetching products");
        const productData = await productResponse.json();
        setProducts(productData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  // Filter categories by parent_category matching the current category
  const filteredCategories = categories.filter(
    (item) => item.parent_category === category
  );

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

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
          </div>

          {/* Category List */}
          <div className="boxing">
            <div id="uibox">
              {loading ? (
                <p>Loading...</p>
              ) : (
                filteredCategories.map((categoryItem) => (
                  <div
                    key={categoryItem.id}
                    className={`box-container category ${
                      selectedCategory === categoryItem.category_name
                        ? "clicked"
                        : ""
                    }`}
                    onClick={() =>
                      handleCategorySelect(categoryItem.category_name)
                    }
                  >
                    <div className="box-cate">
                      {selectedCategory === categoryItem.category_name && (
                        <i
                          className="fas fa-check"
                          style={{ color: "#ee4d2d" }}
                        ></i>
                      )}
                    </div>
                    <div className="boxing">
                      <span>{categoryItem.category_name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Price Filter */}
          <h5>Price</h5>
          <div className="search">
            <input type="number" placeholder="ราคาต่ำสุด" />
            <input type="number" placeholder="ราคาสูงสุด" />
            <button className="play-icon" type="button"></button>
          </div>

          {/* Rating Filter */}
          <h5>Rating</h5>
          <div className="rating">{/* Rating filter can be added here */}</div>
        </div>

        {/* Main Content Section */}
        <div className="main-content">
          <div className="flex">
            <div>
              <h2>{selectedCategory || "All Products"}</h2>
              <h5 className="gray">
                Showing results for {selectedCategory || "All Products"}
              </h5>
            </div>

            {/* Sorting */}
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

          {/* Passing filtered products and selected brand to CategoryPage */}
          <div className="_17mcb">
            <section className="productcate grid-view">
              <CategoryPage
                selectedBrand={selectedCategory}
                products={products}
              />
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
