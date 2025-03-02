"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "./cate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function CategoryPage() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    console.log(`🔍 Fetching categories for id: ${id}`);

    fetch(`http://localhost:3001/api/type/parents/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setCategories(data.categories || []);
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
                    className={`box ${
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
        {/* Show product */}
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
                              <a href={`/products/${product.id}`}>
                                <div className="jBwCF picture-wrapper">
                                  {/* <img
                                    src={product.imageUrls[0]}
                                    alt={product.title}
                                    width="200px"
                                    height="200px"
                                    loading="lazy"
                                  />
                                   */}
                                  *{" "}
                                  <img
                                    src="https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/o0I9vbnKjgYtn4AIA1WDEGCQcByeEwY1k2CeAD~tplv-tej9nj120t-origin.webp"
                                    alt="{product.title}"
                                    width="200px"
                                    height="200px"
                                    loading="lazy"
                                  />
                                </div>
                              </a>
                              {/* <div className="se">
                                <div className="se2">
                                  {product.imageUrls
                                    .slice(1, 3)
                                    .map((imgUrl, idx) => (
                                      <div
                                        className="LBHIN"
                                        key={`${product.id}-${imgUrl}-${idx}`}
                                      >
                                        <a href="" className="uEds4">
                                          <div className="jBwCF picture-wrapper">
                                            <img
                                              src={imgUrl}
                                              alt={`${product.title} - ${idx}`}
                                              loading="lazy"
                                            />
                                          </div>
                                        </a>
                                      </div>
                                    ))}
                                </div>
                              </div>
                               */}
                              <div className="list">
                                <div className="catetitle">{product.title}</div>
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
                                      <span className="soldreal">
                                        {/*formatToK(product.soldreal)*/}
                                        7,100
                                      </span>
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
