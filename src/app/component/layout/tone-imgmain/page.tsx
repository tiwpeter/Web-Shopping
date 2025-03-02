"use client";
import "./boxmain.css";

const Toneimgmain = () => {
  return (
    <div className="tone-imgmain">
      {/* img display */}
      <div className="sectionbox">
        <img
          src="https://img.lazcdn.com/us/domino/e0c0811f1c24d7297909913edb5a6121.jpg_2200x2200q80.jpg_.webp"
          alt=""
          className=""
        />
      </div>

      <div className="pc-download-module">
        <div className="cop-lasa">
          <img className="minimig" src="/icon/s-shop.webp" alt="" />
          <p className="wds">TRY ShopKun APP</p>
        </div>

        {/* box folder */}
        <div
          className="m-body"
          style={{
            backgroundImage:
              "url('https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01tceZus1IewufOY1tZ_!!6000000000919-2-tps-364-316.png')",
          }}
        >
          <div className="score">
            <div className="picture-wrapper star">
              <img
                src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01cAMOjU1zqQJZU8EbT_!!6000000006765-2-tps-19-18.png_2200x2200q80.png_.webp"
                style={{ objectFit: "fill" }}
                alt="Star Rating"
              />
              <span className="rated-txt">4.8 Rated</span>
            </div>
          </div>
          <div className="enjoy-tips-wrap">
            <span className="enjoy-tips">Get the ShopKun app to enjoy</span>
          </div>

          <div className="ls-ul">
            <div className="ls ls-1">
              <div className="picture-wrapper badge">
                <img
                  src="https://img.lazcdn.com/g/tps/imgextra/i2/O1CN01n3PMa828kJZVuCbPp_!!6000000007970-2-tps-72-72.png_2200x2200q80.png_.webp"
                  style={{ objectFit: "fill" }}
                  alt="Free Shipping"
                />
              </div>
              <span className="txt">FREE SHIPPING</span>
            </div>

            <div className="ls ls-2">
              <div className="picture-wrapper badge">
                <img
                  src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01J03SMW1lebTE7xkaN_!!6000000004844-2-tps-72-72.png_2200x2200q80.png_.webp"
                  style={{ objectFit: "fill" }}
                  alt="Exclusive Vouchers"
                />
              </div>
              <span className="txt">EXCLUSIVE VOUCHERS</span>
            </div>
          </div>
        </div>

        {/* QR code */}
        <div className="m-footer">
          <div className="content">
            <div className="qr-code-wrap">
              <div className="picture-wrapper">
                <img
                  src="https://img.lazcdn.com/us/domino/ae0097cdb1eceff6a1c6c8e67b5c09f7.png_2200x2200q80.png_.webp"
                  alt="QR Code"
                />
              </div>
            </div>
            <div className="download-btn">
              <img
                src="https://img.lazcdn.com/g/tps/imgextra/i4/O1CN01uAl8kB1wEv2DNjdhB_!!6000000006277-2-tps-125-36.png"
                alt="Download for Android"
                className="btn1"
              />
              <img
                src="https://img.lazcdn.com/g/tps/imgextra/i1/O1CN01QJGFfc1S0mKngu4rQ_!!6000000002185-2-tps-125-36.png"
                alt="Download for iOS"
                className="btn2"
              />
            </div>
          </div>
          <div>
            <span className="download-tips">
              Download the app now by scanning the QR code
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toneimgmain;
