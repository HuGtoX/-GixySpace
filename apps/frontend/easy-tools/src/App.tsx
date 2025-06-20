import { ConfigProvider } from 'antd';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './index.css';

// 包裹一层组件监听状态变化
const AppWrapper: React.FC = () => {
	return (
		<ConfigProvider locale={zhCN} theme={{}}>
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
