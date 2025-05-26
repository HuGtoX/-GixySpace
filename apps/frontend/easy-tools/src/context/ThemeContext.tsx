import React, { createContext, useContext, useState, useEffect } from 'react';
import { themeColors, defaultTheme } from '../config/theme';

interface ThemeContextType {
  currentColor: string;
  setCurrentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 从 localStorage 读取上次选择的颜色，无则使用默认
  const [currentColor, setCurrentColor] = useState<string>(() => {
    const savedColor = localStorage.getItem('antThemeColor');
    return savedColor && themeColors.includes(savedColor) ? savedColor : defaultTheme.token.colorPrimary;
  });

  // 颜色变化时保存到 localStorage
  useEffect(() => {
    localStorage.setItem('antThemeColor', currentColor);
  }, [currentColor]);

  return (
    <ThemeContext.Provider value={{ currentColor, setCurrentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme 必须在 ThemeProvider 中使用');
  }
  return context;
};