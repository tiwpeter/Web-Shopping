"use client";
import React, { useEffect, useState } from "react";
import "./css/cateproduct.css";
import "./css/cateproductgrid.css";
import "./css/color.css";
import "./css/rating.css";
import "./css/test.css";
import "./css/cateproduct.css";
import "./css/newcate.css";
import MyIcon from "./stat";

// TypeScript interface to define the shape of product data
interface Product {
  id: number;
  title: string;
  price: number;
  discountPrice: string;
  sold: number;
  rating: number;
  soldreal: number;
  imageUrls: string[];
  options: any[];
  category_name: string;
  parent_name: string;
}

interface CategoryPageProps {
  selectedBrand: string;
  products: Product[];
}

export default function CategoryPage({
  selectedBrand,
  products,
}: CategoryPageProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedBrand) {
      setFilteredProducts(
        products.filter((product) => product.category_name === selectedBrand)
      );
    } else {
      setFilteredProducts(products);
    }
    setLoading(false);
  }, [selectedBrand, products]);

  // Function to format number to k units if over 1000
  const formatToK = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return `${count}`;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section id="productList" className="productcate grid-view">
          {filteredProducts.map((product) => (
            <div key={product.id} className="Bm3ON">
              <div className="MefHh Ms6aG">
                <div className="qmXQo">
                  <div className="ICdUp">
                    <div className="_95X4G">
                      <a href={`/products/${product.id}`}>
                        <div className="jBwCF picture-wrapper">
                          <img
                            src={product.imageUrls[0]}
                            alt={product.title}
                            width="200px"
                            height="200px"
                            loading="lazy"
                          />
                        </div>
                      </a>
                      <div className="se">
                        <div className="se2">
                          {product.imageUrls.slice(1, 3).map((imgUrl, idx) => (
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
                      <div className="list">
                        <div className="catetitle">{product.title}</div>
                        <div className="price-container">
                          <div className="price-cate">
                            <span className="pricecate">฿{product.price}</span>
                          </div>
                        </div>
                        <div className="sold">
                          <div>
                            <span className="soldreal">
                              {formatToK(product.soldreal)}
                            </span>
                            <span style={{ marginLeft: "5px" }}>sold</span>
                          </div>
                          <span className="brHcE"></span>
                          <div>
                            <span className="ratingflex">
                              {Array.from({ length: 5 }, (_, index) => {
                                return index < product.rating ? (
                                  <i key={index} className="star"></i>
                                ) : (
                                  <i key={index} className="star empty"></i>
                                );
                              })}
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
          ))}
        </section>
      )}
    </div>
  );
}
