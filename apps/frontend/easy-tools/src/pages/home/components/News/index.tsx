import { FaWeibo, FaZhihu } from "react-icons/fa";
import NewsCard from "./Card";

function News() {
  const weiboItems = {
    id: "weibo",
    title: "微博热搜榜",
    color: "text-weibo",
    bg: "bg-weibo-60",
    icon: <FaWeibo />,
  };
  const zhihuItems = {
    id: "zhihu",
    title: "知乎热搜榜",
    color: "text-zhihu",
    bg: "bg-zhihu-60",
    icon: <FaZhihu />,
  };
  const juejinItems = {
    id: "juejin",
    title: "掘金热搜榜",
    color: "text-juejin",
    bg: "bg-juejin-60",
    icon: <img src="/icon/juejin.svg" />,
  };

  const douyinItems = {
    id: "douyin",
    title: "抖音热搜榜",
    color: "text-douyin",
    bg: "bg-douyin-60",
    icon: <img src="/icon/douyin.png" />,
  };
  const xueqiuItems = {
    id: "xueqiu",
    title: "雪球热搜榜",
    color: "text-xueqiu",
    bg: "bg-xueqiu-60",
    icon: <img src="/icon/xueqiu.png" />,
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
