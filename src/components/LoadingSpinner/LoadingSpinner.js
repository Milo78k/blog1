import React from "react";

import { Spin } from "antd";

function LoadingSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <Spin size="large" />
    </div>
  );
}

export default LoadingSpinner;
