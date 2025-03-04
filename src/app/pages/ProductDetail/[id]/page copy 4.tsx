"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./detail.css";
import { useCart } from "../../../CartContext";

type OptionDetail = {
  option_name: string;
  option_price: number;
  image_urls: string[];
};

type ProductOption = {
  option_type: string;
  options: OptionDetail[];
};

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[]; // Assuming product has images for the main image
  options: ProductOption[];
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOption, setSelectedOption] = useState<OptionDetail | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/Product/${id}`);
        const data = await res.json();

        console.log("Product API Response:", data);

        if (res.ok && data) {
          setProduct(data);

          // ตั้งค่า option เริ่มต้น
          if (data.options.length > 0 && data.options[0].options.length > 0) {
            const defaultOption = data.options[0].options[0];
            setSelectedOption(defaultOption);
            setSelectedImage(defaultOption.image_urls[0] || null); // Set default image if available
          }
        } else {
          console.error("Error:", data.error);
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  // เลือก option
  const handleOptionClick = (option: OptionDetail) => {
    setSelectedOption(option);
    setSelectedImage(
      option.image_urls.length > 0 ? option.image_urls[0] : null
    );
  };

  const handleAddToCart = (autoAdd = false) => {
    if (!product || !selectedOption) {
      if (!autoAdd) alert("กรุณาเลือกตัวเลือกก่อนเพิ่มลงตะกร้า");
      return;
    }

    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: selectedOption.option_price, // ใช้ราคาของ option ที่เลือก
      image: selectedImage || "",
      optionName: selectedOption.option_name, // บันทึกชื่อ option
      quantity: 1,
    };

    addToCart(selectedProduct);

    if (!autoAdd) alert("เพิ่มลงตะกร้าเรียบร้อย!");
  };

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>Starting Price: {product.price} บาท</p>

          {/* แสดงรูปภาพหลักก่อน */}
          {product.images && product.images.length > 0 ? (
            <div className="fff">
              <img
                className="product-image"
                src={selectedImage || product.images[0]} // ใช้ selectedImage ถ้ามีการเลือกภาพ, ไม่งั้นใช้ภาพแรกจาก array
                alt={product.name}
              />
            </div>
          ) : (
            <p>No main image available</p> // ถ้าไม่มีภาพหลัก
          )}

          <p>Selected Option: {selectedOption?.option_name}</p>
          <p>Price: {selectedOption?.option_price} บาท</p>

          <div>
            {product.options.map((option, index) => (
              <div key={index} className="flex items-center">
                <div className="font_comon">{option.option_type}</div>
                <div className="options-container">
                  {option.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(opt)}
                      className={`px-4 py-2 border-2 transition-all duration-300 
    ${
      selectedOption?.option_name === opt.option_name
        ? "border-red-500 bg-red-100 hover:border-red-700"
        : "border-transparent hover:border-blue-500 hover:bg-blue-100"
    } 
    rounded-lg flex flex-col items-center`}
                    >
                      <div className="cate">
                        {opt.image_urls.length > 0 && (
                          <img
                            src={opt.image_urls[0]}
                            alt={opt.option_name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                        )}
                      </div>
                      <span className="text-sm mt-1">{opt.option_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div>
        <button className="buttonsell-A" onClick={() => handleAddToCart(false)}>
          <div className="blac"></div>
          Add to cart
        </button>
      </div>
    </div>
  );
}
