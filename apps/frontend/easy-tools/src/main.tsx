import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ConfigProvider } from "antd";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // Seed Token，影响范围大
          // 派生变量，影响范围小
          colorBgContainer: "#fff",
        },
      }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </StrictMode>
);
