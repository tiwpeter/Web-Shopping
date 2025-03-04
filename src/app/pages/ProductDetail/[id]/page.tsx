"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { useCart } from "../../../CartContext";
import "./detail.css";

type OptionDetail = {
  option_name: string;
  option_price: number;
  image_urls: string[];
};

type ProductOption = {
  option_type: string;
  options: OptionDetail[];
};

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  options: ProductOption[];
  sale_percent: number; // Add this line
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const router = useRouter(); // Initialize router for navigation
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const [selectedOption, setSelectedOption] = useState<OptionDetail | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(
    null
  );
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/Product/${id}`);
        const data = await res.json();
        if (res.ok && data) {
          setProduct(data);
          if (data.options.length > 0 && data.options[0].options.length > 0) {
            const defaultOption = data.options[0].options[0];
            setSelectedOption(defaultOption);
          }
          if (data.images.length > 0) {
            setSelectedThumbnail(data.images[0]);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  const handleOptionClick = (option: OptionDetail) => {
    setSelectedPrice(option.option_price);
    setSelectedOption(option);
    setSelectedImage(
      option.image_urls.length > 0 ? option.image_urls[0] : null
    );
  };

  const handleAddToCart = () => {
    if (!product || !selectedOption) {
      alert("กรุณาเลือกตัวเลือกก่อนเพิ่มลงตะกร้า");
      return;
    }

    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: selectedOption.option_price,
      image: selectedImage || product.images[0],
      optionName: selectedOption.option_name,
      quantity: 1,
    };

    addToCart(selectedProduct);
    alert("เพิ่มลงตะกร้าเรียบร้อย!");
  };

  const handleBuyToCart = () => {
    if (!product || !selectedOption) {
      alert("กรุณาเลือกตัวเลือกก่อนเพิ่มลงตะกร้า");
      return;
    }

    const selectedProduct = {
      id: product.id,
      name: product.name,
      price: selectedOption.option_price,
      image: selectedImage || product.images[0],
      optionName: selectedOption.option_name,
      quantity: 1,
    };

    addToCart(selectedProduct);
    router.push("/pages/Cart"); // This will navigate to the /cart page
  };

  const handleThumbnailClick = (image: string) => {
    setSelectedThumbnail(image);
  };

  return (
    <div>
      {product && (
        <div className="faaa">
          {/* Navigation categories */}
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

          {/* Product detail */}
          <div className="container-detail">
            <div className="detail-container">
              <div className="box box-small">
                {/* Main Image */}
                {product.images && product.images.length > 0 && (
                  <div className="fff">
                    <img
                      className="product-image"
                      src={
                        selectedImage || selectedThumbnail || product.images[0]
                      }
                      alt={product.name}
                    />
                  </div>
                )}

                {/* Thumbnails */}
                {product.images && product.images.length > 0 && (
                  <div>
                    <div className="boximage2">
                      {product.images.map((image, index) => (
                        <div key={index} className="UBG7wZ">
                          <div
                            className="jA1mTx"
                            onClick={() => handleThumbnailClick(image)}
                          >
                            <div
                              className={`YM40Nc ${
                                selectedThumbnail === image
                                  ? "selected-thumbnail"
                                  : ""
                              }`}
                            >
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
                  </div>
                )}
              </div>

              {/* Product information */}
              <div className="box box-large">
                <div>
                  <div>
                    <span className="LLL">
                      {selectedOption?.option_name
                        ? `${product.name} - ${selectedOption.option_name}`
                        : product.name}
                    </span>
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
                        ฿
                        {(
                          (selectedPrice || product.price) *
                          (1 - product.sale_percent / 100)
                        ).toFixed(2)}
                        {/* ถ้ามีการเลือก option ให้แสดงราคาที่เลือก ถ้าไม่ให้แสดงราคาปกติ */}
                      </h1>
                    </div>
                    <div className="wssa secod_price">
                      {selectedPrice || product.price}
                    </div>
                    <div className="sla">{product.sale_percent}%</div>
                  </div>

                  <div className="detailpirce">
                    <div className="flex-colum">
                      {/* ค่าจัดส่ง */}
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
                                    <button className="owdwd flex items-center">
                                      <span className="awxJLd">
                                        เขตพระนคร, จังหวัดกรุงเทพมหานคร
                                      </span>
                                      <div>
                                        <img
                                          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/c98ab2426710d89c9f14.svg"
                                          alt=""
                                          className="dwki"
                                        />
                                      </div>
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
                      {/* Options */}
                      <section
                        className="daw"
                        style={{ flexDirection: "column" }}
                      >
                        {product.options.map((option, index) => (
                          <div key={index}>
                            {/*option_type */}
                            <div className="font_comon">
                              {option.option_type}
                            </div>
                            <div className="options-container">
                              {option.options.map((opt, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleOptionClick(opt)}
                                  className={`button-cate ${
                                    selectedOption?.option_name ===
                                    opt.option_name
                                      ? "hover-active"
                                      : ""
                                  }`}
                                >
                                  <div className="cate">
                                    {opt.image_urls &&
                                      opt.image_urls.map((img, i) => (
                                        <img
                                          key={i} // Assign a unique "key" to each image
                                          src={img} // Use "img" here, not opt.image_urls[0]
                                          alt={opt.option_name}
                                          className="option-image"
                                        />
                                      ))}
                                  </div>

                                  <span>{opt.option_name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </section>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          className="buttonsell-A"
                          onClick={handleAddToCart}
                        >
                          <div className="blac"></div>
                          Add to cart
                        </button>
                        <button
                          className="buttonsell-B"
                          onClick={handleBuyToCart}
                        >
                          ซื้อสินค้า
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
