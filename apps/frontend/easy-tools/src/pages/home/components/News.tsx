import { Button, Avatar } from 'antd';
import {
	FaRobot,
	FaShareAlt,
	FaRegClock,
	FaRegBookmark,
	FaAngleDown
} from 'react-icons/fa';
import TagSelect from '@/components/TagSelect';
import { useState } from 'react';

// 资讯卡片组件
const NewsCard = ({
	image,
	tagIcon,
	tagText,
	time,
	title,
	content,
	authorImg,
	author
}) => {
	return (
		<article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md card-hover">
			<div className="relative">
				<img src={image} alt="资讯" className="w-full h-48 object-cover" />
				<div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1 text-xs font-medium flex items-center">
					{tagIcon} <span>{tagText}</span>
				</div>
				<div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1 text-xs font-medium flex items-center">
					<FaRegClock className="mr-1" />
					<span>{time}</span>
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
				<p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
					{content}
				</p>
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<Avatar src={authorImg} size={24} className="mr-2" />
						<span className="text-xs text-gray-500 dark:text-gray-400">
							{author}
						</span>
					</div>
					<div className="flex space-x-3">
						<Button
							shape="circle"
							icon={<FaRegBookmark />}
							className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
						/>
						<Button
							shape="circle"
							icon={<FaShareAlt />}
							className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-dark-primary"
						/>
					</div>
				</div>
			</div>
		</article>
	);
};

export default function News() {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	// 处理标签选中的回调函数
	const handleTagSelect = (tag: string[]) => {
		setSelectedTags(tag);
	};
	return (
		<>
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">热点资讯</h2>
				<div className="flex space-x-2">
					<TagSelect
						options={['全部', '科技', '设计', '工具']}
						selectedTags={selectedTags}
						onSelect={handleTagSelect}
						style={{ margin: '16px 0' }}
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<NewsCard
					image="https://picsum.photos/id/2/400/200"
					tagIcon={
						<FaRobot className="text-primary dark:text-dark-primary mr-1" />
					}
					tagText="AI工具"
					time="3分钟"
					title="2025年最值得关注的10个AI开发工具，提升效率必备"
					content="随着人工智能技术的快速发展，越来越多的开发者工具涌现出来。本文将介绍10个能够显著提升开发效率的AI工具，帮助开发者更快地实现想法..."
					authorImg="https://picsum.photos/id/64/30/30"
					author="AI研究员"
				/>
				<NewsCard
					image="https://picsum.photos/id/96/400/200"
					tagIcon={
						<FaRobot className="text-primary dark:text-dark-primary mr-1" />
					}
					tagText="设计"
					time="3分钟"
					title="2025年UI设计新趋势：从极简到拟态，这些风格正在流行"
					content="设计行业总是在不断发展变化，新的设计趋势不断涌现。本文将探讨2025年最流行的UI设计趋势，包括轻拟物风格、流体界面、动态深度效果等..."
					authorImg="https://picsum.photos/id/65/30/30"
					author="资深设计师"
				/>
				<NewsCard
					image="https://picsum.photos/id/95/400/200"
					tagIcon={
						<FaRobot className="text-primary dark:text-dark-primary mr-1" />
					}
					tagText="生产力"
					time="3分钟"
					title="提高工作效率的5个冷门工具，让你的一天多出2小时"
					content="设计行业总是在不断发展变化，新的设计趋势不断涌现。本文将探讨2025年最流行的UI设计趋势，包括轻拟物风格、流体界面、动态深度效果等..."
					authorImg="https://picsum.photos/id/66/30/30"
					author="效率专家"
				/>
				<NewsCard
					image="https://picsum.photos/id/98/400/200"
					tagIcon={
						<FaRobot className="text-primary dark:text-dark-primary mr-1" />
					}
					tagText="设计"
					time="3分钟"
					title="2025年UI设计新趋势：从极简到拟态，这些风格正在流行"
					content="设计行业总是在不断发展变化，新的设计趋势不断涌现。本文将探讨2025年最流行的UI设计趋势，包括轻拟物风格、流体界面、动态深度效果等..."
					authorImg="https://picsum.photos/id/60/30/30"
					author="资深设计师"
				/>
				{/* 其他资讯卡片... */}
			</div>
			<button className="w-full py-3 flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
				加载更多 <FaAngleDown />
			</button>
		</>
	);
}
