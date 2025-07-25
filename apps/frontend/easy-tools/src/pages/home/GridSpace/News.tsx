import NewsCard from "../components/News";

export default function News() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">热点资讯</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NewsCard />
      </div>
    </>
  );
}
