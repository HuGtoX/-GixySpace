import { useState, useEffect } from "react";
import { baseUrl } from "@/utils/getEnv";
import FaIcon from "@/components/FaIcon";
import DetailModal from "./DetailModal";
import type { WeatherData } from "@gixy/types";
import "qweather-icons/font/qweather-icons.css"; // 引入天气图标样式

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框显示

  const fetchWeather = async () => {
    try {
      // 获取用户地理位置
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("浏览器不支持地理定位"));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `${baseUrl}/api/weather?lat=${latitude}&lon=${longitude}`,
      );
      if (!response.ok) throw new Error("网络请求失败");
      const data = await response.json();

      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取天气数据失败");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">今日天气</h3>
        <button
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          onClick={() => fetchWeather()}
        >
          <FaIcon icon="FaCircleNotch" />
        </button>
      </div>
      <div
        className="flex flex-col items-center w-full"
        onClick={() => weatherData && setIsModalVisible(true)}
      >
        {weatherData ? (
          <>
            <div className="text-4xl mb-2">
              <i
                className={`qi-${weatherData.weather.now.icon} text-yellow-500`}
              />
            </div>
            <div className="text-2xl font-bold mb-1">
              {weatherData.weather.now.temp}°C
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {weatherData.weather.now.text} · {weatherData.weather.now.windDir}{" "}
              {weatherData.weather.now.windSpeed}m/s
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              湿度: {weatherData.weather.now.humidity}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              空气质量: {weatherData.air.now.category} (AQI:{" "}
              {weatherData.air.now.aqi})
            </div>
          </>
        ) : isLoading ? (
          <div className="text-gray-500">加载中...</div>
        ) : (
          <div className="text-red-500">{error}</div>
        )}
      </div>

      {/* 详情模态框 */}
      <DetailModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        weatherData={weatherData}
      />
    </div>
  );
}
