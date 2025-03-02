"use client";
import React, { useState } from "react";
import { useCart } from "../../CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // ใช้สำหรับสร้าง Slide Drawer
import "./CartPage.css";
import "./button.css";

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartPage = () => {
  const { cart } = useCart();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "",
  });

  // สถานะเปิดปิด Slide Drawer
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });

    // ถ้าเลือก "บัตรเครดิต/เดบิต" ให้เปิด Slide Drawer
    if (name === "paymentMethod" && value === "credit_card") {
      setShowCreditCardForm(true);
    } else {
      setShowCreditCardForm(false);
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({ ...cardInfo, [name]: value });
  };

  const buyFromCart = async () => {
    if (
      !shippingInfo.name ||
      !shippingInfo.address ||
      !shippingInfo.phone ||
      !shippingInfo.paymentMethod
    ) {
      alert("กรุณากรอกข้อมูลการจัดส่งและเลือกวิธีชำระเงินให้ครบถ้วน!");
      return;
    }

    router.push(
      `/payment?cart=${encodeURIComponent(
        JSON.stringify(cart)
      )}&shipping=${encodeURIComponent(JSON.stringify(shippingInfo))}`
    );
  };

  return (
    <div className="cartPage">
      <h1 className="pageTitle">ตะกร้าสินค้าของคุณ</h1>

      {cart.length === 0 ? (
        <p className="emptyCart">ไม่มีสินค้าภายในตะกร้า</p>
      ) : (
        <div className="cartItemsContainer">
          <div className="flex w-full gap-4">
            {/* UI กรอกข้อมูลการจัดส่ง */}
            <div className="shippingForm">
              <h2>ข้อมูลการจัดส่ง</h2>
              <label>ชื่อ - นามสกุล:</label>
              <input
                type="text"
                name="name"
                value={shippingInfo.name}
                onChange={handleChange}
                placeholder="กรอกชื่อของคุณ"
                required
              />

              <label>ที่อยู่:</label>
              <textarea
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="กรอกที่อยู่สำหรับจัดส่ง"
                required
              />

              <label>เบอร์โทรศัพท์:</label>
              <input
                type="text"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                placeholder="กรอกหมายเลขโทรศัพท์"
                required
              />

              <label>วิธีการจัดส่ง:</label>
              <select
                name="shippingMethod"
                value={shippingInfo.shippingMethod}
                onChange={handleChange}
              >
                <option value="standard">จัดส่งปกติ (3-5 วัน)</option>
                <option value="express">จัดส่งด่วน (1-2 วัน)</option>
              </select>
            </div>

            <div className="flex flex-col bg-slate-300">
              {/* UI เลือกวิธีการชำระเงิน */}
              <div className="paymentForm">
                <h2>เลือกวิธีการชำระเงิน</h2>
                <div className="paymentOptions">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      onChange={handleChange}
                    />
                    โอนเงินผ่านธนาคาร
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      onChange={handleChange}
                    />
                    บัตรเครดิต/เดบิต
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="qr_code"
                      onChange={handleChange}
                    />
                    ชำระผ่าน QR Code
                  </label>
                </div>
              </div>

              {/* สรุปยอดรวม */}
              <div className="cartSummary">
                <div className="cartSummaryAmountRow">
                  <span className="amountLabel1">ยอดรวม:</span>
                  <span className="amountValue2">
                    ฿{calculateTotalPrice(cart)}
                  </span>
                </div>

                <button onClick={buyFromCart} className="checkoutButton">
                  ไปที่การชำระเงิน
                </button>
              </div>
            </div>
          </div>

          {/* Slide Drawer สำหรับกรอกข้อมูลบัตรเครดิต */}
          {showCreditCardForm && (
            <motion.div
              className="creditCardDrawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <h3>กรอกข้อมูลบัตรเครดิต</h3>
              <label>หมายเลขบัตร:</label>
              <input
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardChange}
                placeholder="xxxx-xxxx-xxxx-xxxx"
                required
              />

              <label>วันหมดอายุ:</label>
              <input
                type="text"
                name="expiryDate"
                value={cardInfo.expiryDate}
                onChange={handleCardChange}
                placeholder="MM/YY"
                required
              />

              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={cardInfo.cvv}
                onChange={handleCardChange}
                placeholder="xxx"
                required
              />

              <label>ชื่อบนบัตร:</label>
              <input
                type="text"
                name="cardholderName"
                value={cardInfo.cardholderName}
                onChange={handleCardChange}
                placeholder="ชื่อเจ้าของบัตร"
                required
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
