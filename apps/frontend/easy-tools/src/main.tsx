import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import './global.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ConfigProvider
			locale={zhCN}
			theme={{
				cssVar: true,
				token: {
					colorBgContainer: '#fff'
				}
			}}
		>
			<RouterProvider router={router} />
		</ConfigProvider>
	</StrictMode>
);
