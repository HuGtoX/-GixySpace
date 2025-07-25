import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";
import SectionCard from "@/components/SectionCard";
import { Button } from "antd";

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
  aqiLevel: string;
}

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setIsLoading(true);
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟天气数据
      const mockData: WeatherData = {
        location: "深圳",
        temperature: 24,
        description: "多云",
        humidity: 65,
        windSpeed: 3.2,
        aqi: 45,
        aqiLevel: "优"
      };
      
      setWeatherData(mockData);
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
    <SectionCard
      title="今日天气"
      right={
        <Button
          type="text"
          size="small"
          icon={<FaSync />}
          loading={isLoading}
          onClick={fetchWeather}
        />
      }
    >
      <div className="flex flex-col items-center w-full">
        {weatherData ? (
          <>
            <div className="text-4xl mb-2">
              ☁️
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              {weatherData.location}
            </div>
            <div className="text-2xl font-bold mb-1">
              {weatherData.temperature}°C
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {weatherData.description} · 风速 {weatherData.windSpeed}m/s
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              湿度: {weatherData.humidity}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              空气质量: {weatherData.aqiLevel} (AQI: {weatherData.aqi})
            </div>
          </>
        ) : isLoading ? (
          <div className="text-gray-500">加载中...</div>
        ) : (
          <div className="text-red-500">{error}</div>
        )}
      </div>
    </SectionCard>
  );
}