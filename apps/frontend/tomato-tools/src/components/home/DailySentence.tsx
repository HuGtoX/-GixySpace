import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import SectionCard from "@/components/SectionCard";
import { Button } from "antd";
import axios from "@/lib/axios";
import { DailySentence as Reuslt, ResOrNull } from "@gixy/types";
import dayjs from "dayjs";

export default function DailySentence() {
  const [yiyan, setYiyan] = useState<ResOrNull<Reuslt>>();
  const [loading, setLoading] = useState(true);

  const fetchYiyan = async () => {
    try {
      setLoading(true);
      const data = await axios.get<Reuslt>("/api/yiyan/get");
      setYiyan(data);
      const date = dayjs().format("YYYY-MM-DD");
      localStorage.setItem("yiyan", JSON.stringify({ ...data, date }));
    } catch (error) {
      console.error("获取每日一言失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYiyan();
  }, []);

  return (
    <SectionCard
      title="每日一句"
      right={
        <Button
          type="text"
          size="small"
          icon={<FaSync />}
          loading={loading}
          onClick={fetchYiyan}
        />
      }
    >
      <div className="text-center">
        {yiyan ? (
          <>
            <blockquote className="mb-2 text-sm italic leading-relaxed text-gray-700 dark:text-gray-300">
              &ldquo;{yiyan.hitokoto}&rdquo;
            </blockquote>

            <cite className="text-xs text-gray-500 dark:text-gray-400">
              —— {yiyan.from_who} 《{yiyan.from}》
            </cite>
          </>
        ) : loading ? (
          <div className="text-gray-500">加载中...</div>
        ) : (
          <div className="text-gray-500">暂无内容</div>
        )}
      </div>
    </SectionCard>
  );
}
