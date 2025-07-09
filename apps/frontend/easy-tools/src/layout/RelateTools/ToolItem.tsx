import React from "react";
import { colorClasses } from "../../../config/theme";

interface ToolItemProps {
  icon: React.ReactElement<{ className: string }>;
  color: string; // 主题颜色（如 'blue', 'green'）
  name: string; // 工具名称
  href?: string; // 跳转链接（可选）
}

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
