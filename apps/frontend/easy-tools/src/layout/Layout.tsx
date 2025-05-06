import React from 'react';
import { Layout, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import styles from './style.module.scss';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
	const navigate = useNavigate();
	const jumpToHome = () => {
		navigate('/');
	};

	return (
		<Layout className={styles.layout} style={{ height: '100vh' }}>
			<Header style={{ display: 'flex', alignItems: 'center' }}>
				<div className={styles['layout__sider--logo']} onClick={jumpToHome}>
					<img width={160} height={44} src="/logo-text.png" alt="BitCraft" />
				</div>
				<div className={styles['layout__header--right']}>
					<Avatar size={38} src="https://picsum.photos/38/38" />
				</div>
			</Header>

			<div className={styles.layout__body}>
				<Layout className={styles.layout__content}>
					<Sider>
						<Menu />
					</Sider>
					<Content
						style={{ height: '100%', padding: '0 24px', minHeight: 280 }}
					>
						<Outlet />
					</Content>
				</Layout>
			</div>
		</Layout>
	);
};

export default App;
