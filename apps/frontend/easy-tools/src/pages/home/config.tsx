import { FaFilePdf, FaImage } from 'react-icons/fa';

// 工具选项数据
export const toolsMenu = [
	{
		id: 1,
		name: 'PDF',
		url: '/pdf/concat',
		background: 'bg-pink-500/10 dark:bg-pink-500/10',
		icon: <FaFilePdf className="text-pink-500 dark:text-pink-400" />,
		description: 'PDF处理工具: 合并、拆分、压缩等'
	},
	{
		id: 2,
		name: '图片转换',
		icon: <FaImage className="text-primary dark:text-dark-primary" />,
		url: '/image/transform',
		description: '图片转换压缩'
	},
	{
		id: 3,
		name: '文本',
		url: '',
		description: '文本处理工具：格式化、加密等'
	},
	{ id: 4, name: '其他', url: '', description: '其他实用工具' }
];
