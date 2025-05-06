import type { MenuProps } from 'antd';
import { Menu as AntMenu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export const menu: MenuProps['items'] = [
	{
		key: 'pdf',
		name: 'PDF工具',
		children: [
			{
				key: 'concat',
				name: 'PDF合并',
				icon: <span>📄</span>
			},
			{
				key: 'split',
				name: 'PDF拆分',
				icon: <span>📄</span>
			}
		]
	}
].map((item) => {
	return {
		key: item.key,
		label: item.name,
		children: item.children.map((child) => {
			return {
				key: `/${item.key}/${child.key}`,
				label: child.name,
				icon: child.icon
			};
		})
	};
});

const Menu = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<AntMenu
			style={{ height: '100%' }}
			onClick={({ key }) => navigate(key)}
			mode="inline"
			defaultSelectedKeys={[pathname]}
			defaultOpenKeys={[pathname.split('/')[1]]}
			items={menu}
		/>
	);
};

export default Menu;
