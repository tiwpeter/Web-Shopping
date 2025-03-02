"use client";
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
import { useCart } from "../../CartContext"; // ใช้ useCart
import { useAuth } from "../../AuthContext"; // ใช้ useAuth เพื่อดึงข้อมูล user จาก context

import { formatText } from "../../d/page";
const ProductUi = () => {
  const pathname = usePathname();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // ดึงข้อมูลผู้ใช้จาก context
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับเปิด/ปิดโมดอลตะกร้า
  //const [selectedPrice, setSelectedPrice] = useState(null); // สำหรับเลือกราคา
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null); // สำหรับเก็บภาพหลักที่เลือก

  useEffect(() => {
    // ตรวจสอบค่าของ user ทุกครั้งที่ state `user` เปลี่ยนแปลง
    console.log(user);
  }, [user]); // useEffect นี้จะทำงานทุกครั้งที่ state `user` เปลี่ยนแปลง

  useEffect(() => {
    // ดึง ID จาก pathname (สมมติว่า URL รูปแบบ /products/[id])
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
  }, [pathname]); // useEffect จะทำงานเมื่อ pathname เปลี่ยนแปลง
  // ฟังก์ชันสำหรับเปลี่ยนภาพหลักเมื่อคลิกที่ภาพย่อย

  const handleImageClick = (image) => {
    setSelectedImage(image); // เปลี่ยนภาพหลักตามภาพที่คลิก
  };
  // สร้าง state สำหรับเก็บราคาที่เลือก
  const [selectedPrice, setSelectedPrice] = useState(null);

  // ฟังก์ชันจัดการเมื่อคลิกที่ตัวเลือก
  const handleOptionClick = (price) => {
    setSelectedPrice(price); // อัพเดตราคาที่เลือก
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const buyFromCart = async () => {
    if (!user) {
      alert("กรุณาเข้าสู่ระบบเพื่อทำการสั่งซื้อ.");
      return;
    }

    try {
      const orderData = cart.map((item) => ({
        user_name: user.email,
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
      setCart([]);
    } catch (error) {
      console.error(error);
      alert("ไม่สามารถทำรายการได้.");
    }
  };

  if (!product) {
    return <div>กำลังโหลดข้อมูลสินค้า...</div>; // แสดงข้อความโหลด
  }

  const description = `ผงซักฟอก ซักผ้า บรีสเอกเซล เปา แอทแทค ขนาด 75กรัม 

*ราคา FlashSale ขออนุญาติคละสีในบางรายการ*

 ชื่อรุ่น : เปา ซิลเวอร์ นาโน XPERT
- ฆ่าเชื้อไวรัส COVID-19 ได้มากถึง 99.99%
- จัดการได้แม้สิ่งสกปรกที่มองไม่เห็น ทั้งแบคทีเรีย ความชื้น และคราบเหงื่อไคล ซึ่งเป็นต้นเหตุสำคัญของกลิ่นอับ
- มี “แคปซูลน้ำหอม” หอมต่อเนื่องยาวนานทุกครั้งที่สัมผัสและเมื่อสวมใส่

 ชื่อรุ่น : เปา ซิลเวอร์ นาโน XPERT SOFT
- ฆ่าเชื้อไวรัส COVID-19 ได้มากถึง 99.99%
- จัดการได้แม้สิ่งสกปรกที่มองไม่เห็น ทั้งแบคทีเรีย ความชื้น และคราบเหงื่อไคล ซึ่งเป็นต้นเหตุสำคัญของกลิ่นอับ
- มี “แคปซูลน้ำหอม” หอมต่อเนื่องยาวนานทุกครั้งที่สัมผัสและเมื่อสวมใส่
- เพิ่มสารปรับผ้านุ่ม  ให้ผ้านุ่มหอม รีดง่าย จะซัก-ตากเวลาไหน ก็มั่นใจ...เพื่อผ้าสะอาด มีสุขอนามัยทุกการสวมใส่

 ชื่อรุ่น :บรีส เอกเซล (เขียว)
- สูตรเข้มข้น พลังเอนไซม์ 5 เท่าและแคปซูลน้ำหอม ขจัดไวรัส 99.9% และลดแบคทีเรีย
 ชื่อรุ่น :บรีส เอกเซล (ชมพู)
- สูตรเข้มข้น พลังเอนไซม์ 5 เท่าและแคปซูลน้ำหอม กลิ่นหอมสดชื่นยาวนาน
 ชื่อรุ่น :บรีส เอกเซล (ม่วง)
- สูตรเข้มข้น พลังเอนไซม์ 5 เท่าและแคปซูลน้ำหอม กลิ่นหอมหรูหราเหนือระดับ
 ชื่อรุ่น :บรีส เอกเซล (ฟ้า)
- สูตรเข้มข้น พลังเอนไซม์ 5 เท่าและแคปซูลน้ำหอม สยบกลิ่นอับ แม้ตากผ้าในร่ม

 ชื่อรุ่น :แอทแทค อีซี่ ซากุระ (ขาว)
- ขจัดคราบหนัก ขยี้ง่าย ลื่นมือ ล้างฟองออกง่ายในน้ำเดียว
 ชื่อรุ่น :แอทแทค อีซี่ เซ็กซี่ (ม่วง)
- ขจัดคราบหนัก ขยี้ง่าย ลื่นมือ ล้างฟองออกง่ายในน้ำเดียว
 ชื่อรุ่น :แอทแทค อีซี่ สูตรนุ่ม รีดง่าย (ฟ้า)
- ขจัดคราบหนัก ขยี้ง่าย ลื่นมือ ล้างฟองออกง่ายในน้ำเดียว ผ้านุ่มลื่น รีดง่ายหลังจากซัก

 จัดส่งทุกวัน ตัดรอบทุก 6 โมงเย็น 

#ผงซักฟอก #ซักผ้า #บรีสเอกเซล #เปา #แอทแทค`;

  return (
    <div className="faaa">
      <ul className="wfg">
        <li className="sug lpwq">
          <a href="" className="sug-a lpwq">
            <span>Lighting & Décor</span>
          </a>
        </li>
        <li className="sug">
          <span className="sug-a">Décor</span>
        </li>
      </ul>
      <div className="container-detail">
        <div className="detail-container">
          {/* แสดงภาพหลัก และ รูปย่อย */}
          <div className="box box-small">
            {/* รูปหลัก (ภาพแรก) */}
            {product.images && product.images.length > 0 ? (
              <div className="fff">
                <img
                  className="product-image"
                  src={selectedImage || product.images[0]} // ใช้ selectedImage ถ้ามีการเลือกภาพ, ไม่งั้นใช้ภาพแรกจาก array
                  alt={product.title}
                />
              </div>
            ) : (
              <p>No main image available</p> // ถ้าไม่มีภาพหลัก
            )}

            {/* รูปรอง (ภาพที่เหลือ) */}
            {product.images && product.images.length > 0 ? (
              <div>
                <div className="boximage2">
                  {product.images.slice(0).map((image, index) => (
                    <div key={index} className="UBG7wZ">
                      <div
                        className="jA1mTx"
                        onClick={() => handleImageClick(image)}
                      >
                        <div className="YM40Nc">
                          <img
                            className="product-image2"
                            src={image}
                            alt={`Product Thumbnail ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="fwlok">
                  <div className="share">
                    <div className="rhG6k7">แชร์ :</div>
                    <button className="wga icon Vo8Ebs"></button>
                    <button className="wga icon2 Vo8Ebs"></button>
                    <button className="wga icon3 Vo8Ebs"></button>
                    <button className="wga icon4 Vo8Ebs"></button>
                  </div>
                  <div className="favo">
                    <button className="w2JMKY">
                      <img src="/icon/love.png" alt="" className="hea" />
                      <div>Favorite (1.7พัน)</div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p>No additional images available</p> // ถ้าไม่มีภาพรอง
            )}
          </div>
          <div className="box box-large">
            <div>
              <div>
                <span className="LLL">{product.title}</span>
              </div>
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
                <button className="flex custom-button">
                  <div
                    className="undeline color_undeline font_undeline"
                    style={{ height: "20px" }}
                  >
                    722K
                  </div>
                  <div className="secod">ratings</div>
                </button>
              </div>
              <div className="flex pr" style={{ marginTop: "10px" }}>
                <div>
                  {/* แสดงราคาที่เลือก (หากไม่มีการเลือก, จะแสดงช่วงราคาตั้งต้น) */}
                  <h1 style={{ color: "#f57224" }}>
                    ฿{selectedPrice !== null ? selectedPrice : "2 - 10"}
                  </h1>
                </div>
                <div className="wssa secod_price">฿15 - ฿30</div>
                <div className="sla">-87%</div>
              </div>
              <div className="detailpirce">
                <div className="flex-colum">
                  <div className="flexsell">
                    <section className="sec">
                      <h3 className="font_comon">การจัดส่ง</h3>
                      <div className="flex"></div>
                      {/* / */}
                      <div className="grid">
                        <div className="car">
                          <img
                            src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg"
                            alt=""
                            className="carimg"
                          />
                        </div>
                        <div className="flex flex-column fwaxw">
                          <div className="flex item-center pllo">
                            <div className="wdkwo">การจัดส่งถึง</div>
                            <div className="flex item-center tesq">
                              <div className="flex item-center">
                                <button className="owdwd">
                                  <span className="awxJLd">
                                    เขตพระนคร, จังหวัดกรุงเทพมหานคร
                                  </span>
                                  <img
                                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/c98ab2426710d89c9f14.svg"
                                    alt=""
                                    className="dwki"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="wdkwo">ค่าส่ง</div>
                            <div>29</div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <section className="daw">
                    <div className="font_comon">ชนิด</div>
                    <div className="options-container">
                      {product.options && product.options.length > 0 ? (
                        product.options.map((option, index) => (
                          <button
                            className="button-cate"
                            key={index}
                            onClick={() => handleOptionClick(option.price)}
                          >
                            <div className="cate">
                              <img
                                src={option.image_url} // ใช้ image_url จากข้อมูล options
                                alt={option.option_name} // ใช้ option_name เป็น alt text
                              />
                            </div>
                            {option.option_name} {/* แสดงชื่อ option */}
                          </button>
                        ))
                      ) : (
                        <p>No options available</p>
                      )}
                    </div>
                  </section>
                  <section className="daw">
                    <div className="font_comon">จำนวน</div>
                    <div className="counter-container">
                      <button className="button" id="decrease">
                        -
                      </button>
                      <div className="count" id="count">
                        0
                      </div>
                      <button className="button" id="increase">
                        +
                      </button>
                    </div>
                  </section>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="buttonsell-A"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <div className="blac"></div>
                      Add to cart
                    </button>
                    <button className="buttonsell-B">ซื้อสินค้า</button>
                  </div>

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
              </div>
            </div>
          </div>
        </div>
        <div className="detailproduct">
          <section className="Id_w">
            <h2 className="wfwf">รายละเอียดสินค้า</h2>
            <div className="Gfw">
              <div className="e8">
                <p className="QN">{formatText(description)}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductUi;
