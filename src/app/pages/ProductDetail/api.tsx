"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const { id } = useParams(); // อ่านค่าจาก URL สำหรับ product id
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>กำลังโหลดข้อมูลสินค้า...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>รายละเอียดสินค้า</h1>
      {product && (
        <div>
          <h2>{product.name}</h2>
          <p>ราคา: ${product.price}</p>

          <h3>ตัวเลือกสินค้า</h3>
          {product.options &&
            product.options.map((option, index) => (
              <div key={index}>
                <h4>{option.option_type}</h4>
                <ul>
                  {option.options.map((opt, idx) => (
                    <li key={idx}>
                      <p>{opt.option_name}</p>
                      <p>ราคาเพิ่มเติม: ${opt.option_price}</p>
                      {opt.image_urls &&
                        opt.image_urls.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={opt.option_name}
                            width={50}
                          />
                        ))}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
