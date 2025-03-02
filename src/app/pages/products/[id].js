"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchProducts } from "../componet/ShoppingCart/apiService"; // Adjust the path as necessary

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductDetail = async () => {
      if (!id) return; // Ensure ID is available
      try {
        const products = await fetchProducts();
        const foundProduct = products.find((p) => p.id === Number(id));
        setProduct(foundProduct);
      } catch (error) {
        setError("Failed to fetch product details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductDetail();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>Category: {product.cat}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Color: {product.color}</p>
      <p>Size: {product.size}</p>
      <p>Description: {product.desc}</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px", height: "300px" }}
        />
      )}
    </div>
  );
};

export default ProductDetail;
