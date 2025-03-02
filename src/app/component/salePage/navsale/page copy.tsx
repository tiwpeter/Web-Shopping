"use client";
import { useEffect, useState } from "react";
import "./navsale.css";
import "./sale.css";
import "./boxshow2.css";

const Navsale = ({ timeLeft }) => {
  const [formattedTimeLeft, setFormattedTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // ตรวจสอบค่าของ timeLeft ที่รับมาจาก API
    console.log("Received timeLeft from API:", timeLeft);

    // แค่แปลงค่าที่ได้รับจาก API และแสดงผลในรูปแบบที่ต้องการ
    const match = timeLeft.match(
      /(\d+)\s*ชม\.\s*(\d+)\s*นาที\s*(\d+)\s*วินาที/
    );
    if (match) {
      setFormattedTimeLeft({
        hours: match[1], // ชั่วโมง
        minutes: match[2], // นาที
        seconds: match[3], // วินาที
      });
    }
  }, [timeLeft]);

  return (
    <section className="N">
      <div className="icon-LazF">
        <div className="box-icon">
          <div className="flex justify-center">
            <img
              className="icon-Laz"
              src="https://img.lazcdn.com/us/domino/b91bbd59-54e7-47e6-96aa-21d17deceda1_TH-240-36.png_2200x2200q80.png_.webp"
              alt=""
            />
          </div>
          <div>
            <span>
              <h5 className="text-base mr-8">LazMall</h5>
            </span>
          </div>
        </div>
        <div className="box-icon">
          <img
            className="icon-Laz"
            src="https://img.lazcdn.com/us/domino/d682a139-c8d5-4082-8b08-a7623fd117d3_TH-240-36.png_2200x2200q80.png_.webp"
            alt=""
          />
          <span>
            <h5 className="text-lg">Youcher</h5>
          </span>
        </div>
        <div className="box-icon">
          <img
            className="icon-Laz"
            src="https://img.lazcdn.com/us/domino/f6f50d22f023e55215fbb3db0eddcbfd.png_2200x2200q80.png_.webp"
            alt=""
          />
          <span>
            <h5 className="text-lg">Travel</h5>
          </span>
        </div>
        <div className="box-icon">
          <img
            className="icon-Laz"
            src="https://img.lazcdn.com/us/domino/b8fbdde3-0483-4c0d-a837-eca3dbe6bdcc_TH-240-36.jpg_2200x2200q80.jpg_.webp"
            alt=""
          />
          <span>
            <h5 className="text-lg">Tapup</h5>
          </span>
        </div>
      </div>

      <div className="dwss">
        <h1 className="text-2xl font-bold">Flash Sale</h1>
      </div>

      <div className="sle">
        <div className="sale">
          <div className="o">
            <div className="o1">
              <p>On Sale Now</p>
            </div>
            <div className="o2">
              <div className="up">
                <div className="o1">
                  <p>Ending in</p>
                </div>
                <div className="tag-sale">{formattedTimeLeft.hours}</div>
                <div className="m">:</div>
                <div className="tag-sale">{formattedTimeLeft.minutes}</div>
                <div className="m">:</div>
                <div className="tag-sale">{formattedTimeLeft.seconds}</div>
              </div>
            </div>
            <button className="buton-Shop">Shop all products</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navsale;
