"use client";
import React from "react";
import { useCart } from "../CartContext"; // ดึงข้อมูลจาก CartContext
import { useAuth } from "../AuthContext"; // ดึงข้อมูลผู้ใช้จาก AuthContext
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./CartPage.css"; // ใช้ไฟล์ CSS ปกติสำหรับตกแต่ง
import "./button.css"; // ใช้ไฟล์ CSS ปกติสำหรับตกแต่ง

// ฟังก์ชันคำนวณราคาสุทธิทั้งหมด
const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartPage = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart(); // ดึงข้อมูลจาก CartContext
  const { user } = useAuth(); // ดึงข้อมูลผู้ใช้จาก AuthContext

  // ฟังก์ชันสำหรับการซื้อสินค้า
  const buyFromCart = async () => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการสั่งซื้อ.");
      return;
    }

    try {
      const totalAmount = calculateTotalPrice(cart);

      const orderData = cart.map((item) => ({
        user_name: user.email, // ข้อมูลผู้ใช้
        product_name: item.title,
        quantity: item.quantity,
        product_price: item.price,
        amount: item.price * item.quantity, // คำนวณราคาของแต่ละรายการ
      }));

      console.log("Order Data (Array):", orderData);
      console.log("Total Amount:", totalAmount);

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
      setCart([]); // ล้างตะกร้าหลังจากทำการสั่งซื้อสำเร็จ
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถทำรายการได้.");
    }
  };

  return (
    <div className="cartPage">
      <h1 className="pageTitle">ตะกร้าสินค้าของคุณ</h1>

      {/* หากตะกร้าว่าง */}
      {cart.length === 0 ? (
        <p className="emptyCart">ไม่มีสินค้าภายในตะกร้า</p>
      ) : (
        <div className="cartItemsContainer">
          {/* สินค้า */}
          <div className="cartItems">
            {/* หัวข้อแถวแรก */}
            <div className="cartItemHeader">
              <div>Product</div>
              <div>จำนวน</div>
              <div>ราคา</div>
            </div>

            <ul className="cartList">
              {cart.map((item, index) => (
                <li key={index} className="cartItem">
                  {/* แสดงภาพหลักของสินค้า */}
                  <div className="cartItemImageWrapper">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="cartItemImage"
                    />
                  </div>

                  <div className="cartItemDetails">
                    <h3 className="cartItemTitle">{item.title}</h3>
                  </div>

                  {/* จำนวนและปุ่มลบ */}
                  <div className="cartItemRemoveWrapper">
                    <div className="cartItemQuantity">
                      <p>{item.quantity}</p>
                    </div>

                    {/* ปุ่มลบสินค้า */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="removeButton"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                      ลบ
                    </button>
                  </div>

                  {/* ราคารวม */}
                  <div className="cartItemTotal">
                    <p>฿{item.price * item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ยอดรวม */}
          <div className="cartSummary">
            <div className="cartSummaryAmountRow">
              <span className="amountLabel1">Subtotal:</span>
              <span className="amountValue2">฿{calculateTotalPrice(cart)}</span>
            </div>
            <div className="cartSummaryAmountRow">
              <span className="amountLabel1">Discount:</span>
              <span className="amountValue2">฿0</span>
            </div>

            <div className="cartButtons">
              <div className="cartSummaryAmountRow">
                <span className="amountLabel">Grandtotal:</span>
                <span className="amountValue">
                  ฿{calculateTotalPrice(cart)}
                </span>
              </div>
              <button onClick={buyFromCart} className="checkoutButton">
                ไปที่การชำระเงิน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
