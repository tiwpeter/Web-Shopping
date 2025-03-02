import "./product.css";
import Link from "next/link"; // ✅ ใช้ next/link

const ProductSale = ({ products }) => {
  return (
    <div className="w-full bg-blue-500 h-auto flex justify-center items-center">
      <div className="bg-red-500 w-[1200px] h-full">
        <div className="discounted-products flex flex-wrap">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`pages/ProductDetail/${product.id}`} // ✅ ใช้ href แทน to
              className="box-procduct common-img"
              style={{ cursor: "pointer" }}
            >
              <div className="product-item">
                <div style={{ width: "189px", height: "189px" }}>
                  <img
                    src="https://s.isanook.com/ca/0/ui/279/1396205/s__152616986_1562561122.jpg"
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <div className="text-duct">
                  <div className="titile-duct two-line-clamp">
                    <p>
                      QFDI กระเป๋าสะพายหลัง กันน้ำขนาดใหญ่ไนลอน
                      กระเป๋าเป้กีฬาแฟชั่น สไตล์เกาหลี ใส่ของได้เยอะ 4สี
                      กระเป๋าเป้ กระเป๋านักรียน กระเป๋าสะพายหลัง
                    </p>
                  </div>
                  <div className="price-flex1">
                    <div className="price">฿375</div>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSale;
