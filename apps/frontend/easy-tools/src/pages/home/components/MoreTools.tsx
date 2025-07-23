import { FC } from "react";

interface Tool {
  icon: string;
  title: string;
  description: string;
  color: "pink" | "teal" | "amber";
}

const tools: Tool[] = [
  {
    icon: "fa-calendar",
    title: "日程管理",
    description: "智能安排你的每一天",
    color: "pink",
  },
  {
    icon: "fa-bar-chart",
    title: "数据可视化",
    description: "将数据转换为直观图表",
    color: "teal",
  },
  {
    icon: "fa-microphone",
    title: "语音笔记",
    description: "记录你的每一个想法",
    color: "amber",
  },
];

const ToolItem: FC<Tool> = ({ icon, title, description, color }) => (
  <div className="flex items-center rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
    <div
      className={`mr-3 flex h-8 w-8 items-center justify-center rounded bg-${color}-100 dark:bg-${color}-900`}
    >
      <i className={`fa ${icon} text-${color}-600 dark:text-${color}-400`}></i>
    </div>
    <div className="flex-1">
      <span className="text-sm">{title}</span>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    <button className="text-xs text-primary dark:text-dark-primary">
      添加
    </button>
  </div>
);

function MoreTools() {
  return (
    <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <h3 className="mb-3 font-semibold">发现更多工具</h3>
      <div className="space-y-3">
        {tools.map((tool) => (
          <ToolItem key={tool.title} {...tool} />
        ))}
      </div>
    </div>
  );
}

export default MoreTools;
