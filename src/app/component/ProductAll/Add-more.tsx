"use client";
import React, { useState } from "react"; // เพิ่มการนำเข้า useState
import "./cate.css";
import ProductAll from "./ProductAll";

export default function Product() {
  return (
    <div className="mt-4">
      <div className="cate-container duct-link Addhigth ">
        <div className="header-text">
          <p className="header-tiel">Just For You</p>
          <div className="sw">
            <ProductAll />
            <div className="load-more"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
