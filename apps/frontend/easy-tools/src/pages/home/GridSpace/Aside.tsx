import FaIcon from "@/components/FaIcon";
import IconWrapper from "@/components/IconWrapper";
import Weather from "../components/Weather";

export default function Aside() {
  return (
    <>
      <Weather />
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <h3 className="font-semibold mb-3">快捷访问</h3>
        <div className="space-y-3">
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <IconWrapper
              className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3"
              icon={
                <FaIcon
                  icon="FaGithub"
                  className="text-blue-600 dark:text-blue-400"
                />
              }
            />

            <span>GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
              <FaIcon
                icon="FaYoutube"
                className="text-red-600 dark:text-red-400"
              />
            </div>
            <span>YouTube</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
              <FaIcon
                icon="FaSpotify"
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <span>Spotify</span>
          </a>
          <a
            href="#"
            className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
              <FaIcon
                icon="FaDribbble"
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
            <span>Dribbble</span>
          </a>
        </div>
        <button className="w-full mt-3 text-sm text-primary dark:text-dark-primary hover:underline">
          管理快捷访问
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <h3 className="font-semibold mb-3">发现更多工具</h3>
        <div className="space-y-3">
          <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded bg-pink-100 dark:bg-pink-900 flex items-center justify-center mr-3">
              <i className="fa fa-calendar text-pink-600 dark:text-pink-400"></i>
            </div>
            <div className="flex-1">
              <span className="text-sm">日程管理</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                智能安排你的每一天
              </p>
            </div>
            <button className="text-xs text-primary dark:text-dark-primary">
              添加
            </button>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3">
              <i className="fa fa-bar-chart text-teal-600 dark:text-teal-400"></i>
            </div>
            <div className="flex-1">
              <span className="text-sm">数据可视化</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                将数据转换为直观图表
              </p>
            </div>
            <button className="text-xs text-primary dark:text-dark-primary">
              添加
            </button>
          </div>
          <div className="flex items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
              <i className="fa fa-microphone text-amber-600 dark:text-amber-400"></i>
            </div>
            <div className="flex-1">
              <span className="text-sm">语音笔记</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                记录你的每一个想法
              </p>
            </div>
            <button className="text-xs text-primary dark:text-dark-primary">
              添加
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
