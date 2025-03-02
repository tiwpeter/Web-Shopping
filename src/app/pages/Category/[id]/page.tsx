"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./cate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link"; // Import the Link component

export default function CategoryPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // ดึงข้อมูลหมวดหมู่และสินค้าทั้งหมดเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    if (!id) return;

    console.log(`🔍 Fetching categories for id: ${id}`);

    fetch(`http://localhost:3001/api/type/parents/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        console.log("📦 Categories fetched:", data.categories);
        console.log("📦 Products fetched:", data.products); // Log products data here
        setCategories(data.categories || []);
        setProducts(data.products || []); // ตั้งค่า products ให้แสดงสินค้าทั้งหมด
      })
      .catch((error) => console.error("❌ Error fetching categories:", error));
  }, [id]);

  const handleCategoryClick = async (categoryId, categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3001/api/type/findcateprodcut?category_id=${categoryId}`
      );
      const data = await res.json();
      console.log("📦 Products for category fetched:", data.products); // Log the fetched products data here
      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatToK = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return `${count}`;
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
      {/*nav */}
      <div className="container">
        {/* sidebar*/}
        <div className="sidebar">
          <h4>Category</h4>
          <div className="boxing">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category.id}
                  className={`box-container category ${
                    selectedCategory === category.category_name
                      ? "clicked active"
                      : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(category.id, category.category_name)
                  }
                >
                  <div
                    className={`box-cate ${
                      selectedCategory === category.category_name
                        ? "clicked"
                        : ""
                    }`}
                  >
                    {selectedCategory === category.category_name && (
                      <i
                        className="fas fa-check"
                        style={{ color: "#ee4d2d" }}
                      ></i>
                    )}
                  </div>
                  <span>{category.category_name}</span>
                </div>
              ))
            ) : (
              <p>No categories found.</p>
            )}
          </div>
        </div>

        {/*show product */}
        <div className="main-content">
          <div className="_17mcb">
            <section className="productcate grid-view">
              <section id="productList" className="productcate grid-view">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="Bm3ON">
                      <div className="MefHh Ms6aG">
                        <div className="qmXQo">
                          <div className="ICdUp">
                            <div className="_95X4G">
                              <Link href={`/pages/ProductDetail/${product.id}`}>
                                <div className="jBwCF picture-wrapper">
                                  <img
                                    src="https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/o0I9vbnKjgYtn4AIA1WDEGCQcByeEwY1k2CeAD~tplv-tej9nj120t-origin.webp"
                                    alt="{product.title}"
                                    width="200px"
                                    height="200px"
                                    loading="lazy"
                                  />
                                </div>
                              </Link>
                              <div className="list">
                                <div className="catetitle">{product.name}</div>
                                <div className="price-container">
                                  <div className="price-cate">
                                    <span className="pricecate">
                                      ฿{product.price}
                                    </span>
                                  </div>
                                </div>
                                <div className="sold">
                                  <span className="sold">
                                    <div>
                                      <span className="soldreal">7,100</span>
                                      <span style={{ marginLeft: "5px" }}>
                                        sold
                                      </span>
                                    </div>
                                  </span>
                                  <span className="brHcE"></span>
                                  <div>
                                    <span className="ratingflex">
                                      {Array.from({ length: 5 }, (_, index) =>
                                        index < product.rating ? (
                                          <i key={index} className="star"></i>
                                        ) : (
                                          <i
                                            key={index}
                                            className="star empty"
                                          ></i>
                                        )
                                      )}
                                      <span className="ratingadjust">
                                        <span>({formatToK(product.sold)})</span>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </section>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
