'use client';

import React from 'react';
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { useTheme } from '@/contexts/ThemeContext';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

interface AntdProviderProps {
  children: React.ReactNode;
}

const componentsTheme = (isDarkMode: boolean) => ({
  Button: {
    borderRadius: 8,
    controlHeight: 40,
  },
  Input: {
    borderRadius: 8,
    controlHeight: 40,
  },
  Card: {
    borderRadius: 12,
    boxShadow: isDarkMode
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
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
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#FF6347',
          colorBgSpotlight: 'rgba(0,0,0,0.7)',
        },
        components: componentsTheme(isDarkMode),
      }}
    >
      <AntApp>
        <div>{children}</div>
      </AntApp>
    </ConfigProvider>
  );
};

export default AntdProvider;