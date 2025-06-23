import Card from "@/components/Card";
import FaIcon from "@/components/FaIcon";

function Instructions() {
  return (
    <Card title="使用说明">
      <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <li className="flex items-start">
          <FaIcon icon="FaCheckCircle" className="text-accent mt-1 mr-2" />
          <span>支持中文、URL、联系方式等格式，系统会自动识别内容类型</span>
        </li>
        <li className="flex items-start">
          <FaIcon icon="FaCheckCircle" className="text-accent mt-1 mr-2" />
          <span>建议保持默认容错率（M级），可应对15%的图案破损</span>
        </li>
        <li className="flex items-start">
          <FaIcon icon="FaCheckCircle" className="text-accent mt-1 mr-2" />
          <span>生成后可通过鼠标滚轮调整预览大小</span>
        </li>
        <li className="flex items-start">
          <FaIcon icon="FaCheckCircle" className="text-accent mt-1 mr-2" />
          <span>深色背景建议搭配浅色前景色，确保扫描效果</span>
        </li>
      </ul>
      <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
        <div className=" flex items-center text-xs text-blue-700 dark:text-blue-300">
          <FaIcon icon="FaLightbulb" className="mr-1" />
          提示：使用AI智能优化功能，可自动调整最佳参数组合
        </div>
      </div>
    </Card>
  );
}

export default Instructions;
