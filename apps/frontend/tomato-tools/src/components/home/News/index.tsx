import { FaWeibo, FaZhihu } from "react-icons/fa";
import NewsCard from "./NewsCard";

function News() {
  const weiboItems = {
    id: "weibo",
    title: "微博热搜榜",
    color: "text-red-500",
    bg: "bg-red-500",
    icon: <FaWeibo />,
  };
  const zhihuItems = {
    id: "zhihu",
    title: "知乎热搜榜",
    color: "text-blue-500",
    bg: "bg-blue-500",
    icon: <FaZhihu />,
  };
  const juejinItems = {
    id: "juejin",
    title: "掘金热搜榜",
    color: "text-blue-600",
    bg: "bg-blue-600",
    icon: <img src="/icon/juejin.svg" alt="掘金" className="w-6 h-6" />,
  };

  const douyinItems = {
    id: "douyin",
    title: "抖音热搜榜",
    color: "text-black",
    bg: "bg-black",
    icon: <img src="/icon/douyin.png" alt="抖音" className="w-6 h-6" />,
  };
  const xueqiuItems = {
    id: "xueqiu",
    title: "雪球热搜榜",
    color: "text-green-500",
    bg: "bg-green-500",
    icon: <img src="/icon/xueqiu.png" alt="雪球" className="w-6 h-6" />,
  };

  return (
    <>
      <NewsCard
        title={weiboItems.title}
        type={weiboItems.id}
        bg={weiboItems.bg}
        icon={weiboItems.icon}
        color={weiboItems.color}
      />
      <NewsCard
        title={zhihuItems.title}
        type={zhihuItems.id}
        bg={zhihuItems.bg}
        icon={zhihuItems.icon}
        color={zhihuItems.color}
      />

      <NewsCard
        title={douyinItems.title}
        type={douyinItems.id}
        bg={douyinItems.bg}
        icon={douyinItems.icon}
        color={douyinItems.color}
      />
      <NewsCard
        title={xueqiuItems.title}
        type={xueqiuItems.id}
        bg={xueqiuItems.bg}
        icon={xueqiuItems.icon}
        color={xueqiuItems.color}
      />
      <NewsCard
        title={juejinItems.title}
        type={juejinItems.id}
        bg={juejinItems.bg}
        icon={juejinItems.icon}
        color={juejinItems.color}
      />
    </>
  );
}

export default News;