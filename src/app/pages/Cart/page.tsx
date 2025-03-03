"use client";
import React, { useState } from "react";
import { useCart } from "../../CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // ใช้สำหรับสร้าง Slide Drawer
import "./CartPage.css";
import "./button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();
  console.log("Cart data:", cart);
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  // กำหนด state สำหรับข้อมูลบัตรเครดิต
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  //ตัวอย่างการปรับปรุงการตรวจสอบข้อมูลก่อนส่ง:
  const validateCardInfo = () => {
    const { cardNumber, expiryDate, cvv, cardholderName } = cardInfo;

    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return false;
    }

    // ลบเครื่องหมายขีด (-) ออกจากหมายเลขบัตรก่อนการตรวจสอบ
    const cleanedCardNumber = cardNumber.replace(/-/g, "");

    // ตรวจสอบรูปแบบหมายเลขบัตร (การตรวจสอบอย่างง่าย)
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cleanedCardNumber)) {
      alert("หมายเลขบัตรเครดิตไม่ถูกต้อง");
      return false;
    }

    // ตรวจสอบ Luhn Algorithm
    const luhnCheck = (num) => {
      let sum = 0;
      let shouldDouble = false;

      // เริ่มจากขวาไปซ้าย
      for (let i = num.length - 1; i >= 0; i--) {
        let digit = parseInt(num.charAt(i));

        if (shouldDouble) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
      }

      return sum % 10 === 0;
    };

    if (!luhnCheck(cleanedCardNumber)) {
      alert("หมายเลขบัตรเครดิตไม่ถูกต้อง");
      return false;
    }

    // ตรวจสอบรูปแบบวันหมดอายุ (MM/YY)
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryDateRegex.test(expiryDate)) {
      alert("วันหมดอายุไม่ถูกต้อง");
      return false;
    }

    // ตรวจสอบ CVV
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      alert("CVV ต้องเป็นตัวเลข 3 หลัก");
      return false;
    }

    return true;
  };

  // ฟังก์ชันสำหรับตรวจสอบค่าของ state ในคอนโซล
  const logData = (data) => {
    console.log("Data being sent:", data); // แสดงข้อมูลที่เราจะส่ง
  };

  // กำหนด state สำหรับข้อมูล "ที่อยู่" การจัดส่ง
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "", //ที่อยู่
    phone: "",
    //shippingMethod: "standard",
    // paymentMethod: "",
    province: "", //จังหวัด
    district: "", //เขต/อำเภอ
    postalCode: "", //รหัสไปรษณีย์
    // deliveryLocation: "",
  });

  // กำหนด state สำหรับข้อมูล "ที่อยู่" การจัดส่ง
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const buyFromCart = async () => {
    if (!validateCardInfo()) return; // ถ้าข้อมูลไม่ถูกต้อง จะไม่ทำการส่งข้อมูล
    const totalPrice = calculateTotalPrice(cart); // คำนวณยอดรวม
    const data = { cart, shippingInfo, cardInfo, totalPrice };
    logData(data);

    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        alert("Order placed successfully!");
        router.push("/payment");
      } else {
        alert(responseData.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order");
    }
  };

  // กำหนด state สำหรับข้อมูลบัตรเครดิต
  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // ลบตัวอักษรที่ไม่ใช่ตัวเลข
      const onlyNumbers = value.replace(/\D/g, "");

      // ถ้าความยาวของตัวเลขไม่เกิน 16 ตัว
      if (onlyNumbers.length <= 16) {
        // แทรกเครื่องหมาย - ทุกๆ 4 ตัว
        const formattedCardNumber = onlyNumbers
          .replace(/(\d{4})(?=\d)/g, "$1-")
          .slice(0, 19); // เลือกแค่ 16 ตัวเลข + 3 เครื่องหมาย -
        setCardInfo({ ...cardInfo, [name]: formattedCardNumber });
      }
    } else if (name === "expiryDate") {
      // ลบตัวอักษรที่ไม่ใช่ตัวเลข
      const onlyNumbers = value.replace(/\D/g, "");

      // แทรก / ระหว่างเดือนและปี
      if (onlyNumbers.length <= 4) {
        const formattedExpiryDate = onlyNumbers
          .replace(/(\d{2})(?=\d)/g, "$1/")
          .slice(0, 5); // จำกัดให้ไม่เกิน 5 ตัว (MM/YY)
        setCardInfo({ ...cardInfo, [name]: formattedExpiryDate });
      }
    } else if (name === "cvv") {
      // ลบตัวอักษรที่ไม่ใช่ตัวเลข
      const onlyNumbers = value.replace(/\D/g, "");

      // ถ้าความยาวไม่เกิน 3 ตัว
      if (onlyNumbers.length <= 3) {
        setCardInfo({ ...cardInfo, [name]: onlyNumbers });
      }
    } else {
      setCardInfo({ ...cardInfo, [name]: value });
    }
  };
  // ฟังก์ชันที่ใช้ในการจัดการการเลือกวิธีการชำระเงิน
  const handlePaymentMethodChange = (e) => {
    if (e.target.value === "credit_card") {
      setShowCreditCardForm(true); // แสดงฟอร์มบัตรเครดิต
    } else {
      setShowCreditCardForm(false); // ซ่อนฟอร์มบัตรเครดิต
    }
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
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleChange}
                      placeholder="กรอกที่อยู่"
                      required
                    />
                    <label>จังหวัด:</label>
                    <input
                      type="text"
                      name="province"
                      value={shippingInfo.province}
                      onChange={handleChange}
                      placeholder="กรอกจังหวัด"
                      required
                    />

                    <label>เขต/อำเภอ</label>
                    <input
                      type="text"
                      name="district"
                      value={shippingInfo.district}
                      onChange={handleChange}
                      placeholder="กรอกเขต/อำเภอ"
                      required
                    />
                    <label>รหัสไปรษณีย์:</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleChange}
                      placeholder="กรอกรหัสไปรษณีย์"
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
                        onChange={handlePaymentMethodChange}
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
                      ชำระเงินปลายทาง
                    </label>
                  </div>
                </div>
                {/* แสดงฟอร์มบัตรเครดิตเมื่อเลือกบัตรเครดิต */}
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
                {/* สรุปยอดรวม */}

                <div className="cartSummary">
                  <div>
                    <span className="text-xl font-bold">
                      สรุปข้อมูลคำสั่งซื้อ
                    </span>
                  </div>

                  <div className="cartSummaryAmountRow">
                    <span className="amountLabel1">ยอดรวม:</span>
                    <span className="amountValue2">
                      ฿{calculateTotalPrice(cart)}
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="amountLabel1 ">ค่าจัดส่ง</span>
                  </div>
                  <div>
                    <span>ยอดรวมทั้งสิ้น: </span>
                  </div>
                  <button onClick={buyFromCart} className="checkoutButton">
                    ไปที่การชำระเงิน
                  </button>
                </div>
              </div>
            </div>
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
                    <div className="cartItemImageWrapper">
                      <img
                        src={item.image} // ใช้ item.image แทน item.images[0]
                        alt={item.name}
                        className="cartItemImage"
                      />
                    </div>

                    <div className="cartItemDetails">
                      <h3 className="cartItemTitle">
                        {item.name} - {item.optionName}
                      </h3>{" "}
                      {/* แสดงชื่อและตัวเลือก */}
                    </div>

                    <div className="cartItemRemoveWrapper">
                      <div className="cartItemQuantity">
                        <p>{item.quantity}</p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="removeButton"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                        ลบ
                      </button>
                    </div>

                    <div className="cartItemTotal">
                      <p>฿{item.price * item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
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
  );
};

export default CartPage;
