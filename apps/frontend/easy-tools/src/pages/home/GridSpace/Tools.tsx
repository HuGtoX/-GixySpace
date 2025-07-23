import IconWrapper from "@/components/IconWrapper";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { toolsMenu } from "../config";
import TodoList from "@/pages/home/components/TodoList";
import AIToolsSection from "../components/AIToolsSection";
import { FaComment, FaImage } from "react-icons/fa";
import VisitedCard from "../components/visitCard";

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

export default function Tools() {
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
      {/* initialTodos={[
          { id: "1", text: "完成项目报告", completed: true, archived: false },
          { id: "2", text: "回复客户邮件", completed: false, archived: false },
          { id: "3", text: "准备演示文稿", completed: false, archived: false },
          { id: "4", text: "与团队开会", completed: false, archived: false },
        ]} */}
      <TodoList />

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
            bgColor: "theme-indigo",
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
            bgColor: "theme-gray",
          },
        ]}
      />

      <VisitedCard />
    </section>
  );
}
