import React from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import "./index.scss";

const { Header, Content, Footer, Sider } = Layout;

const menu: MenuProps["items"] = [
  {
    key: "pdf",
    name: "PDF工具",
    children: [
      {
        key: "concat",
        name: "PDF合并",
      },
    ],
  },
].map((item) => {
  return {
    key: item.key,
    label: item.name,
    children: item.children.map((child) => {
      return {
        key: `/${item.key}/${child.key}`,
        label: child.name,
      };
    }),
  };
});

const App: React.FC = () => {
  const navigate = useNavigate();
  let { pathname } = useLocation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <div className="layout__header--home" onClick={() => navigate("/")}>
          返回主页
        </div>
      </Header>
      <div className="layout__content">
        <Breadcrumb style={{ margin: "16px 0" }}>{pathname}</Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={[pathname.split("/")[1]]}
              style={{ height: "100%" }}
              items={menu}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </div>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default App;
