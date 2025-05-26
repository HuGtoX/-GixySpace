import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import styles from './style.module.scss';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => {
	const navigate = useNavigate();
	const { currentColor, setCurrentColor } = useTheme();
	// 新增：侧边栏折叠状态
	const [collapsed, setCollapsed] = useState(false);
	// 新增：窗口宽度状态
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	// 监听窗口尺寸变化
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
			// 小屏幕（<768px）自动折叠侧边栏
			if (window.innerWidth < 768) {
				setCollapsed(true);
			}
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const jumpToHome = () => {
		navigate('/');
	};

	return (
		<Layout className={styles.layout} style={{ height: '100vh' }}>
			<Header className={styles['layout__header']}>
				{/* 新增：移动端折叠按钮 */}
				{windowWidth < 768 && (
					<Button
						className={styles['mobile-collapse-btn']}
						icon={collapsed ? <i className="fas fa-bars" /> : <i className="fas fa-times" />}
						onClick={() => setCollapsed(!collapsed)}
					/>
				)}
				<div className={styles['layout__sider--logo']} onClick={jumpToHome}>
					<img width={160} height={44} src="/logo-text.png" alt="BitCraft" />
				</div>
				<div className={styles['layout__header--right']}>
					<ThemeSwitcher
						currentColor={currentColor}
						onThemeChange={setCurrentColor}
					/>
					<Avatar
						size={38}
						src="https://picsum.photos/38/38"
						style={{ marginLeft: '12px' }}
					/>
				</div>
			</Header>

			<div className={styles.layout__body}>
				<Layout className={styles.layout__content}>
					{/* 新增：响应式侧边栏配置 */}
					<Sider
						className={styles.layout__sider}
						collapsed={collapsed}
						breakpoint="lg"  // 大屏（≥992px）自动展开，小屏自动折叠
						onCollapse={(collapsed) => setCollapsed(collapsed)}
						width={256}
						collapsedWidth={64}
					>
						<Menu />
					</Sider>
					<Content
						// 小屏幕调整内边距
						style={{ 
							height: '100%', 
							padding: windowWidth < 768 ? '0 12px' : '0 24px', 
							minHeight: 280 
						}}
					>
						<Outlet />
					</Content>
				</Layout>
			</div>
		</Layout>
	);
};

export default App;
