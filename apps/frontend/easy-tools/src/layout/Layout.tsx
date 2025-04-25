import React from 'react';
import { Layout, Menu, theme, Avatar } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { menu } from './menu';
import styles from './style.module.scss';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken();

	return (
		<Layout className={styles.layout} style={{ height: '100vh' }}>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div
					className={styles['layout__header--logo']}
					onClick={() => navigate('/')}
				>
					<img width={160} height={44} src="/logo-text.png" alt="BitCraft" />
				</div>
				<div className={styles['layout__header--right']}>
					<Avatar size={38} src="https://picsum.photos/38/38" />
				</div>
			</Header>
			<Layout
				className={styles.layout__content}
				style={{
					background: colorBgContainer,
					borderRadius: borderRadiusLG
				}}
			>
				<Sider style={{ background: colorBgContainer }} width={200}>
					<Menu
						onClick={({ key }) => navigate(key)}
						mode="inline"
						defaultSelectedKeys={[pathname]}
						defaultOpenKeys={[pathname.split('/')[1]]}
						style={{
							height: '100%'
						}}
						items={menu}
					/>
				</Sider>
				<Content style={{ height: '100%', padding: '0 24px', minHeight: 280 }}>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};

export default App;
