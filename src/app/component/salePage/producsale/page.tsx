import "./product.css";
import Link from "next/link"; // ✅ ใช้ next/link

const ProductSale = ({ products }) => {
  return (
    <div className="w-full h-auto flex justify-center items-center">
      <div className="w-[1200px] h-full">
        <div className="discounted-products flex flex-wrap">
          {products.slice(0, 6).map(
            (
              product // 🔥 จำกัดให้แสดงแค่ 6 ตัว
            ) => (
              <Link
                key={product.id}
                href={`/ProductDetail/${product.id}`} // ✅ แก้ไข path ให้ถูกต้อง
                className="box-procduct common-img"
                style={{ cursor: "pointer" }}
              >
                <div className="product-item">
                  <div style={{ width: "189px", height: "189px" }}>
                    <img
                      src={product.image_urls[1]}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  <div className="text-duct">
                    <div className="titile-duct two-line-clamp">
                      <p>{product.name}</p>
                    </div>
                    <div className="price-flex1">
                      <div className="price">
                        ฿
                        {(
                          product.price -
                          (product.price * product.sale_percent) / 100
                        ).toFixed(2)}
                      </div>
                    </div>
                    <div className="origin-price">
                      <div className="origin-price-main">
                        <div className="currency">฿</div>
                        <div className="price">{product.price}</div>
                      </div>
                      <span className="discount">{product.sale_percent}%</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSale;
