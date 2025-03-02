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
      <div className="cartItemsContainer">
        <div className="detail-container">
          <div className="cartItemsContainer">
            <div className="flex w-full gap-4 BG">
              {/* UI กรอกข้อมูลการจัดส่ง */}
              <div className="shippingForm ">
                <h2>ข้อมูลการจัดส่ง</h2>

                <div className="flex ml-4 mr-4 gap-8">
                  {/*name */}
                  <div className="w-full">
                    <label>ชื่อ - นามสกุล:</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อของคุณ"
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
                  </div>
                  {/*ที่อยู่ */}
                  <div className="w-full">
                    <label>ที่อยู่:</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อของคุณ"
                      required
                    />
                    <label>จังหวัด:</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อของคุณ"
                      required
                    />

                    <label>เขต/อำเภอ</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อของคุณ"
                      required
                    />
                    <label>รหัสไปรษณีย์:</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleChange}
                      placeholder="กรอกชื่อของคุณ"
                      required
                    />
                    <label>โปรดเลือก สถานที่จัดส่ง:</label>
                    <div className="flex">
                      <div
                        className="tag-item"
                        style={{ border: "1px solid #0094b6" }}
                      >
                        <img src="/job.png" alt="" className="w-4 h-4" />
                        <span>ที่ทำงาน</span>
                      </div>
                      <div
                        className="tag-item"
                        style={{ border: "1px solid #ff6649" }}
                      >
                        <img src="/home2.png" alt="" className="w-4 h-4" />
                        <span>ที่บ้าน</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadow flex flex-col bg-white">
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
                  <div>
                    <span>สรุปข้อมูลคำสั่งซื้อ</span>
                  </div>

                  <div className="cartSummaryAmountRow">
                    <span className="amountLabel1">ยอดรวม:</span>
                    <span className="amountValue2">
                      ฿{calculateTotalPrice(cart)}
                    </span>
                  </div>
                  <div>ค่าจัดส่ง</div>
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
        </div>
      </div>
    </div>
  );
};

export default CartPage;
