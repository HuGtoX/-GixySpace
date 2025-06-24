import { ConfigProvider, theme } from "antd";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "./index.css";

// 包裹一层组件监听状态变化
const AppWrapper: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#FF6347",
        },
        components: {
          Input: {
            colorBgContainer: isDarkMode ? "#374151" : "#F3F4F6",
            borderRadius: 100,
            activeBorderColor: "#FF6347",
            hoverBorderColor: "#FF6347",
            activeShadow: "0 0 0 2px rgba(255, 99, 71, 0.2)",
          },
          Card: {
            colorBgContainer: isDarkMode ? "#1F2937" : "#FFFFFF", // gray-800 : white
            colorBorderSecondary: isDarkMode ? "#374151" : "#E5E7EB", // gray-700 : gray-200
          },
          Modal: {
            contentBg: isDarkMode ? "#1F2937" : "#FFFFFF",
            headerBg: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Drawer: {
            colorBgElevated: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Popover: {
            colorBgElevated: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Dropdown: {
            colorBgElevated: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Select: {
            colorBgContainer: isDarkMode ? "#374151" : "#F3F4F6",
            colorBgElevated: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          DatePicker: {
            colorBgContainer: isDarkMode ? "#374151" : "#F3F4F6",
            colorBgElevated: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Table: {
              colorBgContainer: isDarkMode ? '#1F2937' : '#FFFFFF',
            },
          Layout: {
            bodyBg: isDarkMode ? "#111827" : "#F9FAFB", // gray-900 : gray-50
            headerBg: isDarkMode ? "#1F2937" : "#FFFFFF",
            siderBg: isDarkMode ? "#1F2937" : "#FFFFFF",
          },
          Upload: {
            colorFillAlter: isDarkMode ? "#374151" : "#FAFAFA", // Dragger背景色
            colorBorder: isDarkMode ? "#6B7280" : "#D9D9D9", // 边框颜色
            colorPrimaryBorderHover: "#1890FF", // 悬停时边框颜色
          },
        },
      }}
    >
      <RouterProvider router={router} />
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
