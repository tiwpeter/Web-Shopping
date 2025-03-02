"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
    const pathname = usePathname();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // ดึง ID จาก pathname (สมมติว่า URL รูปแบบ /products/[id])
        const id = pathname.split('/').pop(); // ดึง productId จาก URL path

        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/products/${id}`); // ใช้ API ของคุณ
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };

            fetchProduct();
        }
    }, [pathname]); // useEffect จะทำงานเมื่อ pathname เปลี่ยนแปลง

    if (!product) {
        return <div>กำลังโหลดข้อมูลสินค้า...</div>; // แสดงข้อความโหลด
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>หมวดหมู่: {product.cat}</p>
            <p>ราคา: {product.price}</p>
            <p>สต็อก: {product.stock}</p>
            <p>สี: {product.color}</p>
            <p>ขนาด: {product.size}</p>
            <p>คำอธิบาย: {product.desc}</p>

            {/* แสดงภาพสินค้า */}
            <div>
                {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={product.title}
                            style={{ width: "300px", height: "300px" }}
                        />
                    ))
                ) : (
                    <p>ไม่มีรูปภาพสินค้า</p>
                )}
            </div>

            {/* แสดงตัวเลือกสินค้า */}
            <div>
                <h2>ตัวเลือกสินค้า</h2>
                {product.options && product.options.length > 0 ? (
                    <ul>
                        {product.options.map((option, index) => (
                            <li key={index}>
                                <p>ตัวเลือก: {option.option_name}</p>
                                <p>ค่า: {option.option_value}</p>
                                <p>ราคา: {option.price}</p>
                                {option.image_url && (
                                    <img
                                        src={option.image_url}
                                        alt={option.option_name}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>ไม่มีตัวเลือกสินค้า</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
