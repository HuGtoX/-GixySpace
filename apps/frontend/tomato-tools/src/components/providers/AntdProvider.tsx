"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme, App as AntApp } from "antd";
import { useTheme } from "@/contexts/ThemeContext";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

interface AntdProviderProps {
  children: React.ReactNode;
}
// 结构化颜色配置
export const themeColors = {
  dark: {
    bg: "#1F2937",
    bodyBg: "#111827",
    inputBg: "#374151",
  },
  light: {
    bg: "#FFFFFF",
    bodyBg: "#F9FAFB",
    inputBg: "#F3F4F6",
  },
};

const componentsTheme = (isDarkMode: boolean) => ({
  Button: {
    borderRadius: 8,
    controlHeight: 40,
  },
  Input: {
    borderRadius: 8,
    controlHeight: 40,
  },
  Layout: {
    bodyBg: isDarkMode ? themeColors.dark.bodyBg : themeColors.light.bodyBg, // gray-900 : gray-50
    headerBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg,
    siderBg: isDarkMode ? themeColors.dark.bg : themeColors.light.bg,
    headerPadding: "0 20px",
  },
  Card: {
    borderRadius: 12,
    boxShadow: isDarkMode
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
      : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  Modal: {
    borderRadius: 12,
  },
  Drawer: {
    borderRadius: 12,
  },
});

const AntdProvider = ({ children }: AntdProviderProps) => {
  const { isDarkMode } = useTheme();

  return (
    <AntdRegistry>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: "#FF6347",
            colorBgSpotlight: "rgba(0,0,0,0.7)",
          },
          components: componentsTheme(isDarkMode),
        }}
      >
        <AntApp>
          <div>{children}</div>
        </AntApp>
      </ConfigProvider>
    </AntdRegistry>
  );
};

export default AntdProvider;
