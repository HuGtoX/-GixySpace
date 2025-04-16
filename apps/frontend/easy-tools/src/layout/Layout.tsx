import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { menu } from "./menu";
import "./index.scss";

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <div className="layout__header--home" onClick={() => navigate("/")}>
          返回主页
        </div>
      </Header>
      <Layout
        className="layout__content"
        style={{
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}>
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            onClick={({ key }) => navigate(key)}
            mode="inline"
            defaultSelectedKeys={[pathname]}
            defaultOpenKeys={[pathname.split("/")[1]]}
            style={{
              height: "100%",
            }}
            items={menu}
          />
        </Sider>
        <Content style={{ height: "100%", padding: "0 24px", minHeight: 280 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
