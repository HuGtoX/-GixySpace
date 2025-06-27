import React from "react";
import Header from "@/layout/ToolsLayout/ToolHeader";
import styles from "./style.module.scss";
import { Layout } from "antd";
import RelateTools from "../RelateTools";
import History from "../History";
import Instructions, { InstructionsProps } from "../Instructions";

const { Content } = Layout;

interface ContainerProps {
  title: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  instructions: InstructionsProps;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { title, footer, header, instructions, children } = props;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-full">
      {/* 左侧主操作区 */}
      <Content className="lg:flex-1 lg:overflow-y-auto lg:pr-3 custom-scrollbar">
        <div className={styles.container}>
          <Header title={title} />
          {header}

          <div className={`${styles.content} bg-white dark:bg-gray-800`}>
            {children}
          </div>
          {footer && (
            <div className={`${styles.footer} bg-white dark:bg-gray-800`}>
              {footer}
            </div>
          )}
        </div>
      </Content>

      {/* 右侧说明区 */}
      <div className="lg:w-5/12 lg:overflow-y-auto lg:pl-3 transition-all duration-300 custom-scrollbar">
        {/* 使用说明 */}
        <Instructions {...instructions} />
        {/* 历史记录 */}
        <History />
        {/* 相关工具 */}
        <RelateTools />
      </div>
    </div>
  );
};

export default Container;
