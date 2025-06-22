import { Affix, Input, Button, Dropdown, Menu, Avatar } from 'antd';
import {
	FaSun,
	FaMoon,
	FaBell,
	FaUser,
	FaCog,
	FaSignOutAlt
} from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
const { Search } = Input;

// 顶部导航栏组件
const Header = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	const userMenu = (
		<Menu>
			<Menu.Item key="profile">
				<FaUser className="mr-2" />
				个人资料
			</Menu.Item>
			<Menu.Item key="settings">
				<FaCog className="mr-2" />
				设置
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="logout">
				<FaSignOutAlt className="mr-2" />
				退出登录
			</Menu.Item>
		</Menu>
	);

	return (
		<Affix>
			<header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
				<div className="container mx-auto px-4 py-3 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="text-2xl font-bold text-primary dark:text-dark-primary">
							番茄工具
						</div>
						<div className="relative hidden md:block w-64">
							<Search
								placeholder="搜索工具或资讯..."
							/>
						</div>
					</div>
					<div className="flex items-center space-x-6">
						<Button
							shape="circle"
							icon={
								isDarkMode ? (
									<FaMoon className="text-blue-300" />
								) : (
									<FaSun className="text-yellow-500" />
								)
							}
							onClick={toggleTheme}
							className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						/>
						<Button shape="circle" icon={<FaBell />} className="relative">
							<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
						</Button>
						<Dropdown overlay={userMenu} placement="bottomRight">
							<Avatar
								src="https://picsum.photos/id/64/40/40"
								className="border-2 border-primary dark:border-dark-primary"
							/>
						</Dropdown>
					</div>
				</div>
			</header>
		</Affix>
	);
};

export default Header;
