import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

// 使用antd的spin实现顶部进度条效果
const TopBarProgress = () => (
  <div className="fixed top-[64px] left-0 right-0 z-50">
    <Spin
      spinning={true}
      indicator={<LoadingOutlined style={{ fontSize: 24, color: "#E53935" }} />}
    >
      <div className="h-1 bg-primary/60">
        <div className="h-1 bg-primary animate-[progress_2s_ease-in-out_infinite]" />
      </div>
    </Spin>
  </div>
);

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      {/* 桌面端固定高度布局，移动端保持原有滚动 */}
      <main className="container mx-auto px-4 py-6 lg:h-[calc(100vh-120px)] lg:overflow-hidden">
        <Suspense fallback={<TopBarProgress />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </Container>
  );
};

export default App;
