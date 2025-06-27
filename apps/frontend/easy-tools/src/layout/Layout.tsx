import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";
import RelateTools from "./RelateTools";
import History from "./History";
import Instructions from "./Instructions";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      {/* 桌面端固定高度布局，移动端保持原有滚动 */}
      <main className="container mx-auto px-4 py-6 lg:h-[calc(100vh-120px)] lg:overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
          {/* 左侧主操作区 */}
          <Content
            className="lg:flex-1 lg:overflow-y-auto lg:pr-3 custom-scrollbar"
            style={{
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
          {/* 右侧说明区 */}
          <div className="lg:w-5/12 lg:overflow-y-auto lg:pl-3 transition-all duration-300 custom-scrollbar">
            {/* 使用说明 */}
            <Instructions />
            {/* 历史记录 */}
            <History />
            {/* 相关工具 */}
            <RelateTools />
          </div>
        </div>
      </main>
      <Footer />
    </Container>
  );
};

export default App;
