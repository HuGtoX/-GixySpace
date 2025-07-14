import React from "react";

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
      className="group rounded-lg border border-solid border-gray-200 p-3 hover:border-primary/50 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-primary/50 dark:hover:bg-gray-800/50"
    >
      <div className="flex flex-col items-center">
        <div
          className={`h-12 w-12 rounded-full theme-${color} mb-2 flex items-center justify-center group-hover:bg-${color}-100 dark:group-hover:bg-${color}-900/30 `}
        >
          {icon && React.cloneElement(icon)}
        </div>
        <p className="text-sm font-medium text-gray-800 dark:text-white">
          {name}
        </p>
      </div>
    </a>
  );
};

export default ToolItem;
