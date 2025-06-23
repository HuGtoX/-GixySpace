import { ConfigProvider, theme } from 'antd';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider, { useTheme } from './context/ThemeContext';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './index.css';

// 包裹一层组件监听状态变化
const AppWrapper: React.FC = () => {
	const { isDarkMode } = useTheme();

	return (
		<ConfigProvider 
			locale={zhCN} 
			theme={{
				algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
				token: {
					colorPrimary: '#FF6347',
				},
				components: {
					Input: {
						colorBgContainer: isDarkMode ? '#374151' : '#F3F4F6',
						borderRadius: 100,
						activeBorderColor: '#FF6347',
						hoverBorderColor: '#FF6347',
						activeShadow: '0 0 0 2px rgba(255, 99, 71, 0.2)',
					},
				},
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
};

function App() {
	return (
		<ThemeProvider>
			<AppWrapper />
		</ThemeProvider>
	);
}

export default App;
