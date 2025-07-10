import { useEffect, useState } from "react";
import SectionCard from "./SectionCard";
import { GuestVisitStats, ResOrNull } from "@gixy/types";
import { fetchVisitStats, countVisits } from "@/utils/guestUtils";
import { motion } from "framer-motion";

const StatItem = ({ label, value }: { label: string; value?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 
    backdrop-blur-sm border border-solid border-gray-100 dark:border-gray-700"
  >
    <div className="flex flex-col gap-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span
        className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 
                     dark:from-dark-primary dark:to-blue-400 
                     bg-clip-text text-transparent"
      >
        {value?.toLocaleString() ?? "-"}
      </span>
    </div>
  </motion.div>
);

function VisitedCard() {
  const [visitCount, setVisitCount] =
    useState<ResOrNull<GuestVisitStats>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true);
      try {
        const data = await fetchVisitStats();
        setVisitCount(data);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
    countVisits();
  }, []);

  return (
    <SectionCard title="最近访问">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
        <StatItem
          label="总访问量"
          value={isLoading ? undefined : visitCount?.total}
        />
        <StatItem
          label="今日访问"
          value={isLoading ? undefined : visitCount?.daily}
        />
      </div>
    </SectionCard>
  );
}
export default VisitedCard;
