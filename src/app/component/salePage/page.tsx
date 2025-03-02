"use client";
import Navsale from "./navsale/page";
import { useEffect, useState } from "react";
import ProductSale from "./producsale/page";

const Salepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(""); // เวลาที่เหลือน้อยที่สุด

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3001/api/Product/onSale");
      const data = await res.json();

      console.log("Fetched data:", data);
      setProducts(data.products);
      setLoading(false);

      // คำนวณเวลาที่เหลือน้อยที่สุด
      if (data.products.length > 0) {
        updateGlobalTime(data.products);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (products.length > 0) {
        updateGlobalTime(products);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [products]);

  function updateGlobalTime(products) {
    const remainingTimes = products.map((p) =>
      getTimeRemainingInSeconds(p.discount_end_time)
    );

    const minTime = Math.min(...remainingTimes);
    if (minTime <= 0) {
      setTimeLeft("หมดเวลาแล้ว");
    } else {
      setTimeLeft(formatTime(minTime));
    }
  }

  function getTimeRemainingInSeconds(endTime) {
    return Math.floor((Date.parse(endTime) - Date.now()) / 1000);
  }

  function formatTime(seconds) {
    const hours = Math.floor((seconds / 3600) % 24);
    const minutes = Math.floor((seconds / 60) % 60);
    const sec = seconds % 60;
    return `${hours} ชม. ${minutes} นาที ${sec} วินาที`;
  }

  return (
    <div>
      <Navsale timeLeft={timeLeft} /> {/* ส่งค่า timeLeft ไปที่ Navsale */}
      <ProductSale products={products} />{" "}
      {/* ส่งค่า products ไปที่ ProductSale */}
    </div>
  );
};

export default Salepage;
