import TagSelect from "@/components/TagSelect";
import NewsCard from "../components/News";
import { useState } from "react";

export default function News() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 处理标签选中的回调函数
  const handleTagSelect = (tag: string[]) => {
    setSelectedTags(tag);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">热点资讯</h2>
        <div className="flex space-x-2">
          <TagSelect
            options={["全部", "科技", "设计", "工具"]}
            selectedTags={selectedTags}
            onSelect={handleTagSelect}
            style={{ margin: "16px 0" }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NewsCard />
      </div>
    </>
  );
}
