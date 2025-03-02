"use client";
import { useState } from "react";

export default function Home() {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

    // ฟังก์ชันตรวจสอบและแสดงภาพบัตรเครดิต
    const showCardImage = (cardNumber) => {
      const firstDigit = cardNumber.charAt(0);
      let cardType = "";

      // ตรวจสอบประเภทบัตรจากเลขที่เริ่มต้น
      if (firstDigit === "4") {
        cardType = "visa";
      } else if (firstDigit === "5") {
        cardType = "mastercard";
      } else if (
        firstDigit === "3" &&
        (cardNumber.startsWith("34") || cardNumber.startsWith("37"))
      ) {
        cardType = "amex";
      }

      // แสดงภาพบัตรตามประเภท
      if (cardType) {
        document.getElementById("card-image").src = `/${cardType}.png`; // ให้ตั้งภาพในโฟลเดอร์ public
      }
    };

    // เรียกฟังก์ชันแสดงภาพบัตรเครดิต
    showCardImage(cleanedCardNumber);

    return true;
  };

  return (
    <div>
      <h1>กรอกข้อมูลบัตรเครดิต</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>หมายเลขบัตรเครดิต:</label>
        <input
          type="text"
          name="cardNumber"
          value={cardInfo.cardNumber}
          onChange={handleInputChange}
          placeholder="1234-5678-9876-5432"
        />
        <br />

        <label>วันหมดอายุ (MM/YY):</label>
        <input
          type="text"
          name="expiryDate"
          value={cardInfo.expiryDate}
          onChange={handleInputChange}
          placeholder="MM/YY"
        />
        <br />

        <label>CVV:</label>
        <input
          type="text"
          name="cvv"
          value={cardInfo.cvv}
          onChange={handleInputChange}
          placeholder="123"
        />
        <br />

        <label>ชื่อเจ้าของบัตร:</label>
        <input
          type="text"
          name="cardholderName"
          value={cardInfo.cardholderName}
          onChange={handleInputChange}
        />
        <br />

        <button type="button" onClick={validateCardInfo}>
          ตรวจสอบข้อมูล
        </button>
      </form>

      <div>
        <img
          id="card-image"
          alt="Card Image"
          style={{ marginTop: "20px", width: "150px", height: "100px" }}
        />
      </div>
    </div>
  );
}
