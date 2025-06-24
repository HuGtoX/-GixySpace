import { ConfigProvider, theme } from "antd";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import ThemeProvider, { useTheme } from "./context/ThemeContext";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import "./index.css";

// 结构化颜色配置
const themeColors = {
  dark: {
    bg: "#1F2937",
    bodyBg: "#111827",
    inputBg: "#374151"
  },
  light: {
    bg: "#FFFFFF",
    bodyBg: "#F9FAFB",
    inputBg: "#F3F4F6"
  }
};

// 提取公共组件主题配置
const componentsTheme = (isDarkMode: boolean) => ({
  Input: {
    colorBgContainer: isDarkMode ? themeColors.dark.inputBg : themeColors.light.inputBg,
    borderRadius: 100,
    activeBorderColor: "#FF6347",
    hoverBorderColor: "#FF6347",
    activeShadow: "0 0 0 2px rgba(255, 99, 71, 0.2)"
  },
  Card: {
    colorBgContainer: isDarkMode ? themeColors.dark.bg : themeColors.light.bg, // gray-800 : white
    colorBorderSecondary: isDarkMode ? "#374151" : "#E5E7EB" // gray-700 : gray-200
  },
  Modal: {
    contentBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg,
    headerBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Drawer: {
    colorBgElevated: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Popover: {
    colorBgElevated: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Dropdown: {
    colorBgElevated: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Select: {
    colorBgContainer: isDarkMode ? themeColors.dark.inputBg : themeColors.light.inputBg,
    colorBgElevated: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  DatePicker: {
    colorBgContainer: isDarkMode ? themeColors.dark.inputBg : themeColors.light.inputBg,
    colorBgElevated: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Table: {
    colorBgContainer: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Layout: {
    bodyBg: isDarkMode ? themeColors.dark.bodyBg : themeColors.light.bodyBg, // gray-900 : gray-50
    headerBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg,
    siderBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg
  },
  Upload: {
    colorFillAlter: isDarkMode ? "#374151" : "#FAFAFA", // Dragger背景色
    colorBorder: isDarkMode ? "#6B7280" : "#D9D9D9", // 边框颜色
    colorPrimaryBorderHover: "#1890FF" // 悬停时边框颜色
  }
});

// 包裹一层组件监听状态变化
const AppWrapper: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      locale={zhCN}
      theme={
        {
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#FF6347"
          },
          components: componentsTheme(isDarkMode)
        }
      }
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
