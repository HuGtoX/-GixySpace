import {
  FaFileExport,
  FaImage,
  FaFileImport,
  FaEllipsisH,
  FaCode,
  FaDownload
} from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

// 工具选项数据
export const toolsMenu = [
  {
    id: 1,
    name: "PDF合并",
    url: "/pdf/concat",
    background: "bg-pink-500/10 dark:bg-pink-500/10",
    icon: <FaFileImport className="text-pink-500 dark:text-pink-400" />,
    description: "多个PDF文件合并",
  },
  {
    id: 2,
    name: "图片转换",
    icon: <FaImage className="text-primary dark:text-dark-primary" />,
    url: "/image/transform",
    description: "图片格式转换压缩",
  },
  {
    id: 3,
    name: "PDF拆分",
    url: "/pdf/split",
    background: "bg-blue-500/10 dark:bg-blue-500/10",
    icon: <FaFileExport className="text-blue-500 dark:text-blue-400" />,
    description: "单个PDF文件拆分",
  },
  {
    id: 4,
    name: "Git仓库下载",
    url: "/git/download",
    background: "bg-green-500/10 dark:bg-green-500/10",
    icon: <FaGithub className="text-green-500 dark:text-green-400" />,
    description: "下载GitHub仓库代码",
  },
  {
    id: 5,
    name: "实时编辑渲染",
    url: "/dev/realtime-render",
    background: "bg-blue-500/10 dark:bg-blue-500/10",
    icon: <FaCode className="text-teal-500 dark:text-teal-400" />,
    description: "React编辑器实现实时编辑渲染",
  },
  {
    id: 6,
    name: "URL图标下载",
    url: "/icon/download",
    background: "bg-purple-500/10 dark:bg-purple-500/10",
    icon: <FaDownload className="text-purple-500 dark:text-purple-400" />,
    description: "获取网站图标并下载",
  },
  {
    id: 7,
    name: "其他",
    url: "",
    background: "bg-gray-500/10 dark:bg-gray-500/10",
    icon: <FaEllipsisH className="text-gray-500 dark:text-gray-400" />,
    description: "其他实用工具",
  },
];