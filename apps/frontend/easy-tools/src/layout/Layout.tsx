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
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧主操作区（70%） */}
          <Content
            style={{
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>

          {/* 右侧辅助区（30%） */}
          <div className="lg:w-5/12  transition-all duration-300">
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
