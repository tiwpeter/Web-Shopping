"use client";
// app/productAll/[id]/page.tsx
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./detail.css";
import { useCart } from "../../../CartContext"; //เก็บข้อมูลใส่ ตระกร้า

export default function ProductDetail() {
  const [isHovered, setIsHovered] = useState(false); // สถานะ hover
  const { id } = useParams(); // อ่านค่าจาก URL สำหรับ product id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // สำหรับเก็บภาพหลักที่เลือก
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedOptionName, setSelectedOptionName] = useState(null); //สำหรับเก็บ option ที่เลือก
  const [selectedThumbnail, setSelectedThumbnail] = useState(null); //เพิ่มกรอบสีรอบรูปภาพเมื่อคลิกไ
  const { addToCart } = useCart();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // เพิ่ม state สำหรับจัดเก็บตัวเลือกที่เลือก
  const [selectedOption, setSelectedOption] = useState({
    price: null,
    image: null,
    optionName: null,
  });

  // ดึงข้อมูลสินค้าเมื่อ id เปลี่ยน
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/Product/${id}`);
        const data = await res.json();

        console.log("Product API Response:", data);

        if (res.ok) {
          // ตรวจสอบว่า data เป็น object ที่มีข้อมูลสินค้า
          if (data) {
            setProduct(data); // ใช้ setProduct แทน setProducts
          } else {
            console.error("Unexpected data format:", data);
            setProduct(null); // กำหนดเป็น null เมื่อไม่พบข้อมูล
          }
        } else {
          console.error("Error:", data.error);
          setProduct(null); // กำหนดเป็น null เมื่อมี error
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null); // กำหนดเป็น null เมื่อเกิดข้อผิดพลาด
      } finally {
        setLoading(false); // เปลี่ยนสถานะ loading เป็น false เมื่อดึงข้อมูลเสร็จ
      }
    };

    fetchProduct();
  }, [id]); // id คือตัวแปรที่ใช้ในการดึงข้อมูลสินค้า

  // ฟังก์ชันจัดการเมื่อคลิกที่ตัวเลือก
  const handleOptionClick = (price, images, optionName) => {
    setSelectedPrice(price);
    setSelectedOptionName(optionName); // อัพเดตชื่อของตัวเลือก
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  };

  const handleThumbnailClick = (image) => {
    setSelectedThumbnail(image);
  };

  if (loading) return <p>กำลังโหลดข้อมูลสินค้า...</p>;
  if (error) return <p>{error}</p>;

  const handleImageClick = (image) => {
    setSelectedImage(image); // อัพเดตรูปหลักเมื่อคลิกรูปย่อย
    setSelectedThumbnail(image); // อัพเดตภาพที่มีกรอบสี
  };

  const handleAddToCart = () => {
    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: selectedPrice || product.sale_price,
      image: selectedImage || product.images[0],
      optionName: selectedOptionName,
      quantity: 1,
    };
    addToCart(selectedProduct); // ส่งสินค้าไปยังตระกร้า
  };

  return (
    <div>
      {product && (
        <div className="faaa">
          {/*nav cate */}
          <ul className="wfg">
            <li className="sug lpwq">
              <a href="" className="sug-a lpwq">
                <span>Lighting & Décor</span>
              </a>
            </li>
            <li className="sug">
              <span className="sug-a">Décor</span>
            </li>
          </ul>

          {/*product detail */}
          <div className="container-detail">
            <div className="detail-container">
              {/* แสดงภาพหลัก และ รูปย่อย */}
              <div className="box box-small">
                {/* รูปหลัก (ภาพแรก) */}
                {product.images && product.images.length > 0 ? (
                  <div className="fff">
                    <img
                      className="product-image"
                      src={selectedImage || product.images[0]} // ใช้ selectedImage ถ้ามีการเลือกภาพ, ไม่งั้นใช้ภาพแรกจาก array
                      alt={product.title}
                    />
                  </div>
                ) : (
                  <p>No main image available</p> // ถ้าไม่มีภาพหลัก
                )}

                {/* รูปรอง (ภาพที่เหลือ) */}
                {/* รูปรอง (ภาพที่เหลือ) */}
                {product.images && product.images.length > 0 ? (
                  <div>
                    <div className="boximage2">
                      {product.images.slice(0).map((image, index) => (
                        <div key={index} className="UBG7wZ">
                          <div
                            className="jA1mTx"
                            onClick={() => handleImageClick(image)} // เพิ่มการเรียกใช้ฟังก์ชัน
                          >
                            <div
                              className={`YM40Nc ${
                                selectedThumbnail === image
                                  ? "selected-thumbnail"
                                  : ""
                              }`}
                              onClick={() => handleThumbnailClick(image)}
                            >
                              <img
                                className="product-image2"
                                src={image}
                                alt={`Product Thumbnail ${index + 1}`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p>No additional images available</p> // ถ้าไม่มีภาพรอง
                )}
              </div>

              {/*ข้อมูล */}
              <div className="box box-large">
                <div>
                  <div>
                    <span className="LLL">
                      {selectedOptionName
                        ? `${product.name} - ${selectedOptionName}`
                        : product.name}
                    </span>
                  </div>
                  <div className="rate">
                    <button className="flex button_under">
                      <div
                        className="undeline color_undeline font_undeline"
                        style={{ height: "20px" }}
                      >
                        4.6
                      </div>
                      <div className="star-rating">
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">★</span>
                        <span className="star">☆</span>
                        <span className="star">☆</span>
                      </div>
                    </button>
                    <button className="flex custom-button">
                      <div
                        className="undeline color_undeline font_undeline"
                        style={{ height: "20px" }}
                      >
                        722K
                      </div>
                      <div className="secod">ratings</div>
                    </button>
                  </div>
                  <div className="flex pr" style={{ marginTop: "10px" }}>
                    <div>
                      {/* แสดงราคาที่เลือก (หากไม่มีการเลือก, จะแสดงช่วงราคาตั้งต้น) */}
                      <h1 style={{ color: "#f57224" }}>
                        ฿
                        {(
                          (selectedPrice || product.price) *
                          (1 - product.sale_percent / 100)
                        ).toFixed(2)}
                        {/* ถ้ามีการเลือก option ให้แสดงราคาที่เลือก ถ้าไม่ให้แสดงราคาปกติ */}
                      </h1>
                    </div>
                    <div className="wssa secod_price">
                      {selectedPrice || product.price}
                    </div>
                    <div className="sla">{product.sale_percent}%</div>
                  </div>

                  <div className="detailpirce">
                    <div className="flex-colum">
                      <div className="flexsell">
                        <section className="sec">
                          <h3 className="font_comon">การจัดส่ง</h3>
                          <div className="flex"></div>
                          {/* / */}
                          <div className="grid">
                            <div className="car">
                              <img
                                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg"
                                alt=""
                                className="carimg"
                              />
                            </div>
                            <div className="flex flex-column fwaxw">
                              <div className="flex item-center pllo">
                                <div className="wdkwo">การจัดส่งถึง</div>
                                <div className="flex item-center tesq">
                                  <div className="flex item-center">
                                    <button className="owdwd flex items-center">
                                      <span className="awxJLd">
                                        เขตพระนคร, จังหวัดกรุงเทพมหานคร
                                      </span>
                                      <div>
                                        <img
                                          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/c98ab2426710d89c9f14.svg"
                                          alt=""
                                          className="dwki"
                                        />
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex">
                                <div className="wdkwo">ค่าส่ง</div>
                                <div>29</div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>

                      <section
                        className="daw"
                        style={{ flexDirection: "column" }}
                      >
                        {product.options &&
                          product.options.map((option, index) => (
                            <div key={index} className="flex items-center">
                              <div className="font_comon">
                                {option.option_type}
                              </div>
                              <div className="options-container">
                                {option.options.map((opt, idx) => (
                                  <button
                                    className="button-cate"
                                    key={idx} // ใช้ key ที่เป็น index หรือ identifier ที่ไม่ซ้ำกัน
                                    onClick={() =>
                                      handleOptionClick(
                                        opt.option_price,
                                        opt.image_urls,
                                        opt.option_name
                                      )
                                    } // ส่งราคาที่เลือกและ images ไป// เมื่อคลิกจะอัพเดตราคาที่เลือก
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                  >
                                    <div className="cate">
                                      {opt.image_urls &&
                                        opt.image_urls.map((img, i) => (
                                          <img
                                            key={i}
                                            src={img}
                                            alt={"X"}
                                            className="option-image"
                                          />
                                        ))}
                                    </div>
                                    <span>{opt.option_name}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                      </section>

                      <section className="daw">
                        <div className="font_comon">จำนวน</div>
                        <div className="counter-container">
                          <button className="button" id="decrease">
                            -
                          </button>
                          <div className="count" id="count">
                            0
                          </div>
                          <button className="button" id="increase">
                            +
                          </button>
                        </div>
                      </section>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="buttonsell-A"
                          onClick={handleAddToCart}
                        >
                          <div className="blac"></div>
                          Add to cart
                        </button>
                        <button className="buttonsell-B">ซื้อสินค้า</button>
                      </div>

                      {/* โมดอลแสดงตะกร้า */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
