'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// 定义Loading上下文类型
interface LoadingContextType {
  isLoading: boolean;
  message: string;
  showLoading: (message?: string) => void;
  hideLoading: () => void;
}

// 创建Loading上下文
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// 自定义钩子，用于获取Loading上下文
export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

// LoadingProvider组件，用于提供Loading上下文
interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('加载中...');

  // 显示loading
  const showLoading = useCallback((msg: string = '加载中...') => {
    setMessage(msg);
    setIsLoading(true);
  }, []);

  // 隐藏loading
  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // 缓存上下文值，避免不必要的重新渲染
  const contextValue = useMemo(() => ({
    isLoading,
    message,
    showLoading,
    hideLoading
  }), [isLoading, message, showLoading, hideLoading]);

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-dark-bg2 rounded-xl p-6 flex flex-col items-center shadow-2xl max-w-xs w-full mx-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-800 dark:text-gray-200 text-center">{message}</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;