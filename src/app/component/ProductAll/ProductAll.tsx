// === product not sale
"use client";
import React, { useEffect, useState } from "react";

const ProductAll = () => {
  return (
    <div className="flex" style={{ width: "1200px" }}>
      <div className="non-discounted-products">
        <a className="box-procduct common-img" style={{ cursor: "pointer" }}>
          {/*product-item* */}
          <div className="product-item">
            {/*img */}
            <div style={{ width: "189px", height: "189px" }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmLQfMmrlzTGecDU67djhOVxNXz2OKU0GaxA&s" // Display the first image from the product's image array
                alt="mp"
                className="product-image"
              />
            </div>
            {/*text */}
            <div className="text-duct">
              {/*name */}
              <div className="titile-duct two-line-clamp">
                <p>Ex</p>
              </div>
              {/*price */}
              <div className="price-flex1">
                <div className="price">฿777</div>
              </div>
              <span className="brHcE"></span>
              {/*rating */}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductAll;
