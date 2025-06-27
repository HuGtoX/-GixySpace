import Card from "@/components/Card";
import FaIcon from "@/components/FaIcon";

export interface InstructionsProps {
  title?: string;
  tips?: React.ReactNode;
  content: string[] | React.ReactNode;
}

function Instructions(props: InstructionsProps) {
  const RenderList = () => {
    if (Array.isArray(props.content)) {
      return props.content.map((item, index) => (
        <li key={index} className="flex items-start">
          <FaIcon
            icon="FaCheckCircle"
            className="text-accent mt-1 mr-2 flex-shrink-0 text-primary"
          />
          <span>{item}</span>
        </li>
      ));
    }
  };

  return (
    <Card title={props.title || "使用说明"}>
      {Array.isArray(props.content) ? (
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {RenderList()}
        </ul>
      ) : (
        props.content
      )}
      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className=" flex items-center text-xs text-blue-700 dark:text-blue-300">
          <FaIcon icon="FaLightbulb" className="mr-1" />
          提示：
          {props.tips ||
            "整个转换过程都在您的本地进行，我们不会上传任何数据到云端服务器"}
        </div>
      </div>
    </Card>
  );
}

export default Instructions;
