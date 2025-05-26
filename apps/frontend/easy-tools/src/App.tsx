import { ConfigProvider } from 'antd';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { ThemeProvider,useTheme } from './context/ThemeContext'; // 新增引入
import { defaultTheme } from './config/theme';
import './index.css'

// 包裹一层组件监听状态变化
const AppWrapper: React.FC = () => {
	const { currentColor } = useTheme();  // 获取动态颜色状态
  
	return (
	  <ConfigProvider
		locale={zhCN}
		theme={{
		  ...defaultTheme,
		  token: {
			...defaultTheme.token,
			colorPrimary: currentColor  
		  }
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
