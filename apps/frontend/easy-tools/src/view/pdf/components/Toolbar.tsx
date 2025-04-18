/**
 * @file Toolbar
 * @auth Gixy
 * @date 2025-04-18
 */

import type { FC, ReactNode } from "react";
import { Layout } from "antd";
const { Header } = Layout;

interface ToolbarProps {
  children?: ReactNode;
}
const Toolbar: FC<ToolbarProps> = (props: ToolbarProps) => {
  return (
    <Header
      style={{
        backgroundColor: "white",
        height: 48,
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        borderBottom: "1px solid #eaeaea",
      }}>
      {props.children}
    </Header>
  );
};

export default Toolbar;
