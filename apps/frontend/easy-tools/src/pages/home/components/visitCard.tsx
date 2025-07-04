import SectionCard from "./SectionCard";

export default function VisitedCard() {
  return (
    <SectionCard title="最近访问">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm">总访问量</span>
          <span className="text-lg font-bold text-primary dark:text-dark-primary">
            <span id="stats-total-visits">0</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">今日访问</span>
          <span className="text-lg font-bold text-primary dark:text-dark-primary">
            <span id="stats-today-visits">0</span>
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">工具使用量</span>
          <span className="text-lg font-bold text-primary dark:text-dark-primary"></span>
        </div>
      </div>
    </SectionCard>
  );
}
