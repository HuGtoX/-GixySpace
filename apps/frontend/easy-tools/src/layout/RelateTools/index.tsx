import ToolItem from "./ToolItem";
import Card from "@/components/Card";
import {
  FaBarcode,
  FaLink,
  FaLock,
  FaQrcode,
  FaImage,
  FaClone,
} from "react-icons/fa";

// 工具列表配置数据（修改后）
const tools = [
  { icon: <FaBarcode />, color: "blue", name: "条形码生成器" },
  { icon: <FaLink />, color: "green", name: "短链接生成器" },
  { icon: <FaLock />, color: "purple", name: "文本加密工具" },
  { icon: <FaQrcode />, color: "red", name: "二维码解码工具" },
  { icon: <FaImage />, color: "yellow", name: "图片转二维码" },
  { icon: <FaClone />, color: "indigo", name: "批量生成器" },
];

function RelateTools() {
  return (
    <Card title="相关工具">
      <div className="grid grid-cols-2 gap-3">
        {/* 遍历工具列表渲染ToolItem */}
        {tools.map((tool, index) => (
          <ToolItem key={index} {...tool} />
        ))}
      </div>
    </Card>
  );
}

export default RelateTools;
