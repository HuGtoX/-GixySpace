import React from "react";

interface ToolItemProps {
  icon: React.ReactElement<{ className: string }>;
  color: string; // 主题颜色（如 'blue', 'green'）
  name: string; // 工具名称
  href?: string; // 跳转链接（可选）
}

// 预定义颜色类名映射
const colorClasses = {
  blue: "bg-blue-50 dark:bg-blue-500 text-blue-500",
  green: "bg-green-50 dark:bg-green-500 text-green-500",
  purple: "bg-purple-50 dark:bg-purple-500 text-purple-500",
  red: "bg-red-50 dark:bg-red-500 text-red-500",
  yellow: "bg-yellow-50 dark:bg-yellow-500 text-yellow-500",
  indigo: "bg-indigo-50 dark:bg-indigo-500 text-indigo-500",
};

const ToolItem: React.FC<ToolItemProps> = ({
  icon,
  color,
  name,
  href = "#",
}) => {
  return (
    <a
      href={href}
      className="group p-3 rounded-lg border border-solid border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 "
    >
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center mb-2 group-hover:bg-${color}-100 dark:group-hover:bg-${color}-900/30 `}
        >
          {/* 添加text-${color}-500类名控制图标颜色 */}
          {icon &&
            React.cloneElement(icon, {
              className: `text-${color}-500`,
            })}
        </div>
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          {name}
        </p>
      </div>
    </a>
  );
};

export default ToolItem;
