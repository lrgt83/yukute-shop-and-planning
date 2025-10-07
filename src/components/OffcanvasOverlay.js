import React from "react";

function OffcanvasOverlay({ handleDismiss }) {
  return (
    <div
      className="offcanvas-overlay"
      onClick={() => handleDismiss(false)}
    ></div>
  );
}

export default OffcanvasOverlay;
