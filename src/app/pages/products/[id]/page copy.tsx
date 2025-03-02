"use client"; // เพื่อทำให้เป็น Client Component

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./detail.css";
import "./detailbox2.css";
import "./font.css";
import "./rate.css";
import "./star.css";
import "./sale.css";
import "./express.css";
import "./detailproduct.css";
import "./nav2.css";

// ProductUi Component
const ProductUi = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null); // State สำหรับผู้ใช้
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับเปิด/ปิดโมดอลตะกร้า
  const [selectedPrice, setSelectedPrice] = useState(null); // สำหรับเลือกราคา

  // ฟังก์ชันเพิ่มสินค้าลงในตะกร้า
  const addToCart = (product) => {
    const quantity = prompt(
      `คุณต้องการเพิ่ม ${product.title} เข้าตะกร้าเท่าไร?`,
      "1"
    );
    const quantityNumber = parseInt(quantity, 10);

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      alert("กรุณาใส่จำนวนที่ถูกต้อง.");
      return;
    }

    const itemToAdd = { ...product, quantity: quantityNumber };
    setCart((prevCart) => [...prevCart, itemToAdd]);
    alert(`${product.title} ถูกเพิ่มลงในตะกร้าแล้ว! จำนวน: ${quantityNumber}`);
  };

  // ฟังก์ชันจัดการการซื้อจากตะกร้า
  const buyFromCart = async () => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการสั่งซื้อ.");
      return;
    }

    try {
      const orderData = cart.map((item) => ({
        user_id: user.id, // ส่งข้อมูล user.id
        user_email: user.email, // ส่งข้อมูล user.email
        product_name: item.title,
        quantity: item.quantity,
        product_price: item.price,
        amount: item.price * item.quantity,
      }));

      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`ไม่สามารถทำรายการได้: ${errorMessage}`);
      }

      const data = await response.json();
      alert(`ทำรายการสำเร็จ! หมายเลขคำสั่งซื้อ: ${data.orderIds.join(", ")}`);
      setCart([]); // เคลียร์ตะกร้า
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถทำรายการได้.");
    }
  };

  // ฟังก์ชันเปิด/ปิดโมดอล
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // ดึงข้อมูลผู้ใช้ (สมมติว่าเป็นค่าที่เก็บใน LocalStorage หรือดึงจาก API)
  useEffect(() => {
    const fetchUserData = async () => {
      // ตัวอย่างการดึงข้อมูลผู้ใช้จาก API หรือ localStorage
      const userData = { id: 2, email: "tiw@gmail.com" }; // แทนที่ด้วยข้อมูลจริง
      setUser(userData); // ตั้งค่าผู้ใช้
    };

    fetchUserData();
  }, []); // ทำงานครั้งเดียวเมื่อคอมโพเนนต์โหลดเสร็จ

  // ดึงข้อมูลสินค้าจาก API
  useEffect(() => {
    const id = pathname.split("/").pop(); // ดึง productId จาก URL path

    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/api/products/${id}`
          ); // ใช้ API ของคุณ
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }
  }, [pathname]);

  if (!product) {
    return <div>กำลังโหลดข้อมูลสินค้า...</div>;
  }

  return (
    <div className="faaa">
      <div className="container-detail">
        <div className="detail-container">
          {/* แสดงภาพหลัก และ รูปย่อย */}
          <div className="box box-small">
            {product.images && product.images.length > 0 ? (
              <div className="fff">
                <img
                  className="product-image"
                  src={product.images[0]} // ใช้ภาพแรกจาก array
                  alt={product.title}
                />
              </div>
            ) : (
              <p>No main image available</p>
            )}

            {/* รูปรอง (ภาพที่เหลือ) */}
            {product.images && product.images.length > 1 ? (
              <div>
                <div className="boximage2">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="UBG7wZ">
                      <div className="YM40Nc">
                        <img
                          className="product-image2"
                          src={image}
                          alt={`Product Thumbnail ${index + 1}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No additional images available</p>
            )}
          </div>

          {/* ข้อมูลสินค้า */}
          <div className="box box-large">
            <span className="LLL">{product.title}</span>
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
            </div>
            <div className="flex pr">
              <h1>฿{selectedPrice !== null ? selectedPrice : "2 - 10"}</h1>
              <div className="wssa secod_price">฿15 - ฿30</div>
              <div className="sla">-87%</div>
            </div>
          </div>
        </div>
      </div>
      {/* ปุ่มเพิ่มสินค้าลงในตะกร้า */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        เพิ่มลงในตะกร้า
      </button>

      {/* ปุ่มดูตะกร้า 
      <button onClick={toggleModal}>ดูตะกร้า</button>
*/}
      {/* โมดอลแสดงตะกร้า */}
      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h2>ตะกร้าสินค้า</h2>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.title} - จำนวน: {item.quantity}
                </li>
              ))}
            </ul>
            <button onClick={toggleModal}>ปิด</button>
            <button onClick={buyFromCart}>ซื้อ</button>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
};

export default ProductUi;
