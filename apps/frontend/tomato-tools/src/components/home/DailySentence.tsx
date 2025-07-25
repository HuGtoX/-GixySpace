import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import SectionCard from "@/components/SectionCard";
import { Button } from "antd";

interface SentenceData {
  content: string;
  author?: string;
  source?: string;
}

export default function DailySentence() {
  const [sentence, setSentence] = useState<SentenceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSentence = async () => {
    try {
      setIsLoading(true);
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 模拟每日一句数据
      const sentences = [
        {
          content: "生活不是等待暴风雨过去，而是要学会在雨中跳舞。",
          author: "维维安·格林"
        },
        {
          content: "成功不是终点，失败不是末日，继续前进的勇气才最可贵。",
          author: "温斯顿·丘吉尔"
        },
        {
          content: "今天的努力，是为了明天的美好。",
        },
        {
          content: "每一个不曾起舞的日子，都是对生命的辜负。",
          author: "尼采"
        }
      ];
      
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      setSentence(randomSentence);
    } catch (err) {
      console.error('获取每日一句失败:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSentence();
  }, []);

  return (
    <SectionCard
      title="每日一句"
      right={
        <Button
          type="text"
          size="small"
          icon={<FaSync />}
          loading={isLoading}
          onClick={fetchSentence}
        />
      }
    >
      <div className="text-center">
        {sentence ? (
          <>
            <blockquote className="text-sm text-gray-700 dark:text-gray-300 mb-2 italic leading-relaxed">
              "{sentence.content}"
            </blockquote>
            {sentence.author && (
              <cite className="text-xs text-gray-500 dark:text-gray-400">
                —— {sentence.author}
              </cite>
            )}
          </>
        ) : isLoading ? (
          <div className="text-gray-500">加载中...</div>
        ) : (
          <div className="text-gray-500">暂无内容</div>
        )}
      </div>
    </SectionCard>
  );
}