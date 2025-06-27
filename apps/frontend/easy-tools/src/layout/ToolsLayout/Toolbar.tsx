/**
 * @file Toolbar
 * @auth Gixy
 * @date 2025-04-18
 */

import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Layout, Button, InputNumber } from "antd";
const { Header } = Layout;

interface ToolbarProps {
  handleAdd?: () => void;
  handleRotateLeft?: () => void;
  handleRotateRight?: () => void;
  handleComplete?: () => Promise<void>;
  children?: ReactNode;
}
const Toolbar: FC<ToolbarProps> = (props: ToolbarProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleComplete = async () => {
    setIsPending(true);
    await props.handleComplete?.().finally(() => {
      setIsPending(false);
    });
  };

  return (
    <Header className="h-12 flex items-center px-3 border-solid border-b border-gray-200 dark:border-gray-700">
      <Button
        icon={<span>➕</span>}
        onClick={props.handleAdd}
        style={{ marginRight: 10 }}
      >
        添加
      </Button>
      <Button
        icon={<span>↩️</span>}
        onClick={props.handleRotateLeft}
        style={{ marginRight: 10 }}
      >
        向左旋转
      </Button>
      <Button
        icon={<span style={{ transform: "scaleX(-1)" }}>↩️</span>}
        onClick={props.handleRotateRight}
        style={{ marginRight: 10 }}
      >
        向右旋转
      </Button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: "auto",
        }}
      >
        <span style={{ fontSize: 14, marginRight: 10 }}>拆分，每隔</span>
        <InputNumber
          min={1}
          defaultValue={1}
          style={{ width: 40, marginRight: 10 }}
        />
        <span style={{ fontSize: 14, marginRight: 10 }}>页面</span>
        <Button type="primary" loading={isPending} onClick={handleComplete}>
          完成
        </Button>
      </div>
    </Header>
  );
};

export default Toolbar;
