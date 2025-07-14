import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import { DailySentence as Reuslt } from "@gixy/types";
import axios from "@/server";
import SectionCard from "./SectionCard";

export default function DailySentence() {
  const [yiyan, setYiyan] = useState<Reuslt>(null);
  const [loading, setLoading] = useState(true);

  const fetchYiyan = async () => {
    try {
      setLoading(true);
      const data = await axios.get<Reuslt>("/api/yiyan/get");
      setYiyan(data);
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
      title="每日一言"
      right={
        <button
          onClick={fetchYiyan}
          className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaSync
            className={`text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ${loading ? "animate-spin" : ""}`}
          />
        </button>
      }
    >
      <div className="group relative rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-700/50">
        {loading ? (
          <p className="primay-text animate-pulse">正在获取中...</p>
        ) : (
          <>
            <p className="primay-text line-clamp-3">
              {yiyan?.hitokoto || "生活明朗，万物可爱"}
            </p>
            <p className="secondary-text mt-2">— {yiyan?.from}</p>
          </>
        )}
      </div>
    </SectionCard>
  );
}
