import IconWrapper from "@/components/IconWrapper";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { toolsMenu } from "../config";
import TodoList from "@/pages/home/components/TodoList";
import AIToolsSection from "../components/AIToolsSection";
import { FaComment, FaImage } from "react-icons/fa";

interface ToolItemProps {
  name: string;
  icon: React.ReactNode;
  link?: string;
  background?: string;
  description: string;
}
const ToolItem = ({
  name,
  icon,
  link,
  description,
  background = "bg-primary/10",
}: ToolItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Tooltip
      title={description || "暂无描述"} // 无描述时显示默认提示
      placement="top"
      mouseEnterDelay={0.3} // 悬停0.3秒后显示
    >
      <div
        className="tool-icon bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-lg ripple cursor-pointer pixel-grow"
        draggable="true"
        onClick={handleClick}
      >
        <IconWrapper size={12} background={background} icon={icon} />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </Tooltip>
  );
};

export default function Tools() {
  return (
    <section className="lg:col-span-3 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">常用工具</h2>
        <Button
          type="text"
          className="text-sm text-primary dark:text-dark-primary hover:underline"
        >
          编辑
        </Button>
      </div>

      <div id="tool-grid" className="grid grid-cols-2 gap-4">
        {toolsMenu.map((item) => (
          <ToolItem
            key={item.id}
            name={item.name}
            icon={item.icon}
            link={item.url}
            background={item?.background}
            description={item.description}
          />
        ))}
      </div>

      <TodoList
        initialTodos={[
          { id: "1", text: "完成项目报告", completed: true },
          { id: "2", text: "回复客户邮件", completed: false },
          { id: "3", text: "准备演示文稿", completed: false },
          { id: "4", text: "与团队开会", completed: false },
        ]}
      />

      <AIToolsSection
        title="AI助手"
        iconText="AI"
        tools={[
          {
            icon: <FaComment className="text-indigo-500" />,
            name: "智能问答",
            description: "获取问题的智能答案和建议",
            buttonText: "打开会话",
            status: null,
            bgColor: "indigo-500",
          },
          {
            icon: <FaImage className="text-gray-400" />,
            name: "图像生成",
            description: "根据文本描述创建高质量图像",
            buttonText: null,
            status: {
              text: "开发中",
              tagColor: "bg-gray-400/10",
              date: "预计2025年Q3上线",
            },
            bgColor: "indigo-500",
          },
        ]}
      />
    </section>
  );
}
