import { ConfigProvider } from 'antd';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

// https://ant-design.antgroup.com/docs/react/customize-theme-cn
function App() {
	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				cssVar: true,
				token: {
					colorPrimary: '#03DDB9',
					colorBgContainer: '#fff'
				},
				components: {
					Layout: {},
					Menu: {}
				}
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}

export default App;
