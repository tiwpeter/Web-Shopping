"use client"
// CartContext.js
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
  const addToCart = (product) => {
    const newProduct = { 
      ...product, 
      quantity: 1 // เพิ่มค่าปริมาณเริ่มต้น
    };
    console.log("Adding product to cart:", newProduct); // ตรวจสอบข้อมูลที่เพิ่มเข้าไปในตะกร้า

    // ตรวจสอบว่าไม่มีสินค้าซ้ำในตะกร้า
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, newProduct];
    });
  };

  // ฟังก์ชันลบสินค้าจากตะกร้า
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // ฟังก์ชันล้างตะกร้า
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
/*
const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

const clearCart = () => {
  setCart([]);
};
*/