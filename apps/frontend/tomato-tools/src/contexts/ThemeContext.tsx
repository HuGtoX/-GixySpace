"use client";

import React, { useState, createContext, useContext, useEffect } from "react";

// 定义主题上下文类型
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// 主题上下文，提供明确的类型定义
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkMode");
    const isDark = savedTheme ? JSON.parse(savedTheme) : false;
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", JSON.stringify(newTheme));
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // 避免服务端渲染和客户端渲染不一致 - 改进版本
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
