"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "",
    province: "",
    district: "",
    postalCode: "",
    deliveryLocation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const logData = (data) => {
    console.log("Data being sent:", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      cardInfo,
      shippingInfo,
    };
    logData(data);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResponseMessage(result.message);
    } catch (error) {
      console.log("Error:", error);
      setResponseMessage("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formattedValue = value.replace(/\D/g, "").slice(0, 16);
      const formattedCardNumber = formattedValue.replace(
        /(\d{4})(?=\d)/g,
        "$1-"
      );
      setCardInfo({ ...cardInfo, [name]: formattedCardNumber });
    } else if (name === "expiryDate") {
      let formattedValue = value.replace(/\D/g, "").slice(0, 4);
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2,
          4
        )}`;
      }
      setCardInfo({ ...cardInfo, [name]: formattedValue });
    } else if (name === "cvv") {
      // ทำการกรองเฉพาะตัวเลข และจำกัดความยาวไม่เกิน 3 ตัว
      const formattedValue = value.replace(/\D/g, "").slice(0, 3);
      setCardInfo({ ...cardInfo, [name]: formattedValue });
    } else {
      setCardInfo({ ...cardInfo, [name]: value });
    }

    console.log("Updated card info:", { ...cardInfo, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    if (e.target.value === "credit_card") {
      setShowCreditCardForm(true);
    } else {
      setShowCreditCardForm(false);
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <label>เบอร์โทรศัพท์:</label>
        <input
          type="text"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          placeholder="กรอกหมายเลขโทรศัพท์"
          required
        />
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
            value="other"
            onChange={handlePaymentMethodChange}
          />
          วิธีการชำระเงินอื่น
        </label>

        <motion.button
          type="submit"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Send
        </motion.button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

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
            maxLength="19"
            style={{
              borderBottom: "2px solid #000",
            }}
            required
          />

          <label>วันหมดอายุ:</label>
          <input
            type="text"
            name="expiryDate"
            value={cardInfo.expiryDate}
            onChange={handleCardChange}
            placeholder="MM/YY"
            maxLength="5"
            style={{
              borderBottom: "2px solid #000",
            }}
            required
          />

          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            value={cardInfo.cvv}
            onChange={handleCardChange}
            placeholder="xxx"
            maxLength="3" // จำกัดความยาวให้ไม่เกิน 3 ตัว
            style={{
              borderBottom: "2px solid #000",
            }}
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
  );
}
