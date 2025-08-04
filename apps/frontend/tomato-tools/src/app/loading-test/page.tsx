"use client";

import { useState, useEffect } from "react";
import { Button } from "antd";
import Loading from "@/app/loading";

export default function LoadingTest() {
  const [showLoading, setShowLoading] = useState(false);

  const handleShowLoading = () => {
    setShowLoading(true);
    // 3秒后隐藏loading
    setTimeout(() => setShowLoading(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Loading效果测试</h1>
      <Button type="primary" onClick={handleShowLoading}>
        显示Loading
      </Button>

      {showLoading && <Loading />}

      <div className="mt-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-2">测试说明</h2>
        <p className="text-gray-600 dark:text-gray-300">
          点击按钮将在Header下方显示进度条样式的Loading效果，3秒后自动隐藏。
          此效果会在页面路由切换或数据加载时自动显示。
        </p>
      </div>
    </div>
  );
}