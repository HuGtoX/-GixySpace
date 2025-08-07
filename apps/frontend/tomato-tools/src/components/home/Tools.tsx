import IconWrapper from "@/components/IconWrapper";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toolsMenu } from "@/config/tools";
import { FaComment, FaImage, FaEllipsisH } from "react-icons/fa";
import SectionCard from "@/components/SectionCard";
import ToolsModal from "./ToolsModal";

interface ToolItemProps {
  name: string;
  icon: React.ReactNode;
  link?: string;
  background?: string;
  description: string;
  itemClick?: () => void;
}

const ToolItem = ({
  name,
  icon,
  link,
  description,
  itemClick,
  background = "bg-primary/10",
}: ToolItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    itemClick && itemClick();
    if (link) {
      router.push(link);
    }
  };

  return (
    <div
      className="tool-icon ripple pixel-grow cursor-pointer rounded-xl bg-white p-4 text-center shadow-md hover:shadow-lg dark:bg-gray-800"
      draggable="true"
      onClick={handleClick}
    >
      <IconWrapper size={12} background={background} icon={icon} />
      <span className="mb-1 text-sm font-medium">{name}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {description || ""}
      </p>
    </div>
  );
};

const AIToolItem = ({
  icon,
  name,
  description,
  buttonText,
  status,
  bgColor,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  buttonText?: string | null;
  status?: {
    text: string;
    tagColor: string;
    date: string;
  } | null;
  bgColor: string;
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex items-center space-x-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor}`}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {buttonText && (
          <Button type="primary" size="small">
            {buttonText}
          </Button>
        )}
        {status && (
          <div className="text-right">
            <span
              className={`inline-block rounded-full px-2 py-1 text-xs ${status.tagColor}`}
            >
              {status.text}
            </span>
            <p className="mt-1 text-xs text-gray-400">{status.date}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Tools() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <section className="space-y-6 lg:col-span-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">常用工具</h2>
        <Button
          type="text"
          className="text-sm text-primary hover:underline dark:text-dark-primary"
        >
          编辑
        </Button>
      </div>

      <div id="tool-grid" className="grid grid-cols-2 gap-4">
        {toolsMenu
          .filter((item) => item.id !== 7) // 过滤掉"其他"工具
          .map((item) => (
            <ToolItem
              key={item.id}
              name={item.name}
              icon={item.icon}
              link={item.url}
              background={item?.background}
              description={item.description}
            />
          ))}

        {/* 单独处理"其他"工具菜单 */}
        <ToolItem
          key={999}
          name={"其他"}
          icon={<FaEllipsisH className="text-gray-500 dark:text-gray-400" />}
          background={"bg-gray-500/10 dark:bg-gray-500/10"}
          itemClick={() => setModalVisible(true)}
          description={"其他实用工具"}
        />
      </div>

      {/* 其他工具弹窗 */}
      <ToolsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* AI工具区块 */}
      <SectionCard title="AI助手">
        <div className="space-y-3">
          <AIToolItem
            icon={<FaComment className="text-indigo-500" />}
            name="智能问答"
            description="获取问题的智能答案和建议"
            buttonText="打开会话"
            status={null}
            bgColor="bg-indigo-100"
          />
          <AIToolItem
            icon={<FaImage className="text-gray-400" />}
            name="图像生成"
            description="根据文本描述创建高质量图像"
            buttonText={null}
            status={{
              text: "开发中",
              tagColor: "bg-gray-400/10 text-gray-600",
              date: "预计2025年Q3上线",
            }}
            bgColor="bg-gray-100"
          />
        </div>
      </SectionCard>

      {/* 访问记录卡片 */}
      <SectionCard title="最近访问">
        <div className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p>暂无访问记录</p>
        </div>
      </SectionCard>
    </section>
  );
}
