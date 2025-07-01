import { Modal } from "antd";
import type { WeatherData } from "@gixy/types";

interface DetailModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  weatherData: WeatherData;
}

function DetailModal(props: DetailModalProps) {
  const { isModalVisible, setIsModalVisible, weatherData } = props;

  return (
    <Modal
      title="天气详情"
      open={isModalVisible}
      onOk={() => setIsModalVisible(false)}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      okText="关闭"
    >
      {weatherData && (
        <div className="space-y-3">
          <p>实时温度: {weatherData.weather.now.temp}°C</p>
          <p>天气状况: {weatherData.weather.now.text}</p>
          <p>
            风向风速: {weatherData.weather.now.windDir}{" "}
            {weatherData.weather.now.windSpeed}m/s
          </p>
          <p>空气湿度: {weatherData.weather.now.humidity}%</p>
          <p>空气质量等级: {weatherData.air.now.category}</p>
          <p>PM2.5: {weatherData.air.now.pm2p5} μg/m³</p>
          <p>臭氧浓度: {weatherData.air.now.o3} μg/m³</p>
        </div>
      )}
    </Modal>
  );
}

export default DetailModal;
