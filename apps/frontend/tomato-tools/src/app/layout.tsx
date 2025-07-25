import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@ant-design/v5-patch-for-react-19";
import ThemeProvider from "@/contexts/ThemeContext";
import AntdProvider from "@/components/providers/AntdProvider";

export const metadata: Metadata = {
  title: "番茄工具 - 实用在线工具集合",
  description:
    "番茄工具提供PDF合并、PDF拆分、图片转换、实时编辑渲染等实用在线工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider>
          <AntdProvider>{children}</AntdProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
