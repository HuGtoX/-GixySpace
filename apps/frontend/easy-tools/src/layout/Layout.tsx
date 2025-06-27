import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Container from "./Container";
import Footer from "./Footer";

const App: React.FC = () => {
  return (
    <Container>
      <Header />
      {/* 桌面端固定高度布局，移动端保持原有滚动 */}
      <main className="container mx-auto px-4 py-6 lg:h-[calc(100vh-120px)] lg:overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </Container>
  );
};

export default App;
