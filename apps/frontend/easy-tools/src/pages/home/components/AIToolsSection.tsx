import React from "react";

type ToolItem = {
  icon: React.ReactNode;
  name: string;
  description: string;
  buttonText?: string;
  status?: {
    text: string;
    tagColor: string;
    date: string;
  };
  bgColor: string;
};
type AIToolsSectionProps = {
  title: string;
  iconText: string;
  tools: ToolItem[];
};

const AIToolsSection: React.FC<AIToolsSectionProps> = ({
  title,
  iconText,
  tools,
}) => {
  return (
    <div>
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold">{iconText}</span>
        </div>
        <h2 className="text-xl font-semibold ml-3">{title}</h2>
      </div>

      {tools.map((tool, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md ${index !== tools.length - 1 ? "mb-4" : ""} hover:shadow-lg transition-shadow ${tool.status ? "border border-dashed border-gray-300 dark:border-gray-600" : ""}`}
        >
          <div className="flex items-start">
            <div
              className={`w-10 h-10 rounded-lg ${tool.bgColor} flex items-center justify-center mr-3`}
            >
              {tool.icon}
            </div>
            <div>
              <h3 className="font-medium mb-1">{tool.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {tool.description}
              </p>
              {tool.buttonText && (
                <button className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">
                  {tool.buttonText}
                </button>
              )}
              {tool.status && (
                <div className="flex items-center">
                  <span
                    className={`text-xs ${tool.status.tagColor} dark:${tool.status.tagColor} text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full mr-2`}
                  >
                    {tool.status.text}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {tool.status.date}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIToolsSection;
