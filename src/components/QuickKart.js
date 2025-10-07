import React from "react";
import img1 from "../assets/theme/media/stock-600x400/img-1.jpg"
import img2 from "../assets/theme/media/stock-600x400/img-2.jpg"
import img3 from "../assets/theme/media/stock-600x400/img-3.jpg"
import img4 from "../assets/theme/media/stock-600x400/img-4.jpg"
import img8 from "../assets/theme/media/stock-600x400/img-8.jpg"

function QuickKart({ isActive, handleClose }) {
  return (
    <div
      id="kt_quick_cart"
      className={`offcanvas offcanvas-right p-10 ${
        isActive ? "offcanvas-on" : ""
      }`}
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-7">
        <h4 className="font-weight-bold m-0">Venta actual</h4>
        <button
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_cart_close"
          onClick={handleClose}
        >
          <i className="ki ki-close icon-xs text-muted"></i>
        </button>
      </div>
      <div className="offcanvas-content">
        <div className="offcanvas-wrapper mb-5 scroll-pull">
          <div className="d-flex align-items-center justify-content-between py-8">
            <div className="d-flex flex-column mr-2">
              <a
                href="/"
                className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
              >
                iBlender
              </a>
              <span className="text-muted">
                The best kitchen gadget in 2020
              </span>
              <div className="d-flex align-items-center mt-2">
                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                  $ 350
                </span>
                <span className="text-muted mr-1">for</span>
                <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                  5
                </span>
                <a
                  href="/"
                  className="btn btn-xs btn-light-success btn-icon mr-2"
                >
                  <i className="ki ki-minus icon-xs"></i>
                </a>
                <a href="/" className="btn btn-xs btn-light-success btn-icon">
                  <i className="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="/" className="symbol symbol-70 flex-shrink-0">
              <img src={img1} title="" alt="" />
            </a>
          </div>
          <div className="separator separator-solid"></div>
          <div className="d-flex align-items-center justify-content-between py-8">
            <div className="d-flex flex-column mr-2">
              <a
                href="/"
                className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
              >
                SmartCleaner
              </a>
              <span className="text-muted">Smart tool for cooking</span>
              <div className="d-flex align-items-center mt-2">
                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                  $ 650
                </span>
                <span className="text-muted mr-1">for</span>
                <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                  4
                </span>
                <a
                  href="/"
                  className="btn btn-xs btn-light-success btn-icon mr-2"
                >
                  <i className="ki ki-minus icon-xs"></i>
                </a>
                <a href="/" className="btn btn-xs btn-light-success btn-icon">
                  <i className="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="/" className="symbol symbol-70 flex-shrink-0">
              <img src={img2} title="" alt="" />
            </a>
          </div>
          <div className="separator separator-solid"></div>
          <div className="d-flex align-items-center justify-content-between py-8">
            <div className="d-flex flex-column mr-2">
              <a
                href="/"
                className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
              >
                CameraMax
              </a>
              <span className="text-muted">
                Professional camera for edge cutting shots
              </span>
              <div className="d-flex align-items-center mt-2">
                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                  $ 150
                </span>
                <span className="text-muted mr-1">for</span>
                <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                  3
                </span>
                <a
                  href="/"
                  className="btn btn-xs btn-light-success btn-icon mr-2"
                >
                  <i className="ki ki-minus icon-xs"></i>
                </a>
                <a href="/" className="btn btn-xs btn-light-success btn-icon">
                  <i className="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="/" className="symbol symbol-70 flex-shrink-0">
              <img src={img3} title="" alt="" />
            </a>
          </div>
          <div className="separator separator-solid"></div>
          <div className="d-flex align-items-center justify-content-between py-8">
            <div className="d-flex flex-column mr-2">
              <a
                href="/"
                className="font-weight-bold text-dark text-hover-primary"
              >
                4D Printer
              </a>
              <span className="text-muted">Manufactoring unique objects</span>
              <div className="d-flex align-items-center mt-2">
                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                  $ 1450
                </span>
                <span className="text-muted mr-1">for</span>
                <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                  7
                </span>
                <a
                  href="/"
                  className="btn btn-xs btn-light-success btn-icon mr-2"
                >
                  <i className="ki ki-minus icon-xs"></i>
                </a>
                <a href="/" className="btn btn-xs btn-light-success btn-icon">
                  <i className="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="/" className="symbol symbol-70 flex-shrink-0">
              <img src={img4} title="" alt="" />
            </a>
          </div>
          <div className="separator separator-solid"></div>
          <div className="d-flex align-items-center justify-content-between py-8">
            <div className="d-flex flex-column mr-2">
              <a
                href="/"
                className="font-weight-bold text-dark text-hover-primary"
              >
                MotionWire
              </a>
              <span className="text-muted">Perfect animation tool</span>
              <div className="d-flex align-items-center mt-2">
                <span className="font-weight-bold mr-1 text-dark-75 font-size-lg">
                  $ 650
                </span>
                <span className="text-muted mr-1">for</span>
                <span className="font-weight-bold mr-2 text-dark-75 font-size-lg">
                  7
                </span>
                <a
                  href="/"
                  className="btn btn-xs btn-light-success btn-icon mr-2"
                >
                  <i className="ki ki-minus icon-xs"></i>
                </a>
                <a href="/" className="btn btn-xs btn-light-success btn-icon">
                  <i className="ki ki-plus icon-xs"></i>
                </a>
              </div>
            </div>
            <a href="/" className="symbol symbol-70 flex-shrink-0">
              <img src={img8} title="" alt="" />
            </a>
          </div>
        </div>
        <div className="offcanvas-footer">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <span className="font-weight-bold text-muted font-size-sm mr-2">
              Total
            </span>
            <span className="font-weight-bolder text-dark-50 text-right">
              $1840.00
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-7">
            <span className="font-weight-bold text-muted font-size-sm mr-2">
              Sub total
            </span>
            <span className="font-weight-bolder text-primary text-right">
              $5640.00
            </span>
          </div>
          <div className="text-right">
            <button type="button" className="btn btn-primary text-weight-bold">
              Facturar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickKart;
