import { ConfigProvider, theme, message, Spin } from "antd";
import { router } from "./router";
import { useEffect, useState, CSSProperties } from "react";
import { RouterProvider } from "react-router-dom";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import { componentsTheme } from "../config/theme";
import { getGuestId } from "./utils/guestUtils";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "./index.css";

const AppWrapper: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [_, contextHolder] = message.useMessage();

  useEffect(() => {
    getGuestId().finally(() => {
      setLoading(false);
    });
  }, []);

  // 新增：加载覆盖层样式（根据主题动态调整）
  const loadingStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isDarkMode
      ? "rgba(0, 0, 0, 0.7)"
      : "rgba(255, 255, 255, 0.9)",
    zIndex: 1000,
  };

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#FF6347",
        },
        components: componentsTheme(isDarkMode),
      }}
    >
      {contextHolder}
      {loading ? (
        <div style={loadingStyle}>
          <Spin size="large" tip="加载中..." />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppWrapper />
    </ThemeProvider>
  );
}

export default App;
