import "./ToolMenuPage.css";
import { useNavigate } from "react-router-dom";
import Banner from "./banner";

const ToolMenuPage = () => {
  const navigate = useNavigate();

  // 工具选项数据
  const tools = [
    {
      id: 1,
      name: "PDF工具",
      url: "/pdf/concat",
      description: "PDF处理工具：合并、拆分、压缩等",
    },
    {
      id: 2,
      name: "图片工具",
      url: "",
      description: "图片处理工具：压缩、格式转换等",
    },
    {
      id: 3,
      name: "文本工具",
      url: "",
      description: "文本处理工具：格式化、加密等",
    },
    { id: 4, name: "其他工具", url: "", description: "其他实用工具" },
  ];

  return (
    <div className="tool-menu-page">
      {/* 顶部信息栏 */}
      <header className="info-bar">
        <h1>工具菜单</h1>
        <p>该网站主要是提供一些日常需要用到的实用工具。</p>
      </header>
      <Banner />
      {/* 工具选项区域 */}
      <div className="tool-options">
        {tools.map((tool) => (
          <div
            onClick={() => navigate(tool.url)}
            key={tool.id}
            className="tool-card fade-in">
            <h2>{tool.name}</h2>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolMenuPage;
