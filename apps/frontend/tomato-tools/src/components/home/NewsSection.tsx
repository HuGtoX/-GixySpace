import React from 'react';
import Image from 'next/image';
import NewsCard from './News/NewsCard';
import { FaWeibo, FaZhihu } from 'react-icons/fa';

const NewsSection = () => {
	const weiboItems = {
		id: 'weibo',
		title: '微博热搜榜',
		color: 'text-weibo',
		bg: 'bg-weibo-60',
		icon: <FaWeibo />
	};
	const zhihuItems = {
		id: 'zhihu',
		title: '知乎热搜榜',
		color: 'text-zhihu',
		bg: 'bg-zhihu-60',
		icon: <FaZhihu />
	};
	const juejinItems = {
		id: 'juejin',
		title: '掘金热搜榜',
		color: 'text-juejin',
		bg: 'bg-juejin-60',
		icon: <Image src='/icon/juejin.svg' alt='掘金' width={20} height={20} />
	};

	const douyinItems = {
		id: 'douyin',
		title: '抖音热搜榜',
		color: 'text-douyin',
		bg: 'bg-douyin-60',
		icon: <Image src='/icon/douyin.png' alt='抖音' width={20} height={20} />
	};
	const xueqiuItems = {
		id: 'xueqiu',
		title: '雪球热搜榜',
		color: 'text-xueqiu',
		bg: 'bg-xueqiu-60',
		icon: <Image src='/icon/xueqiu.png' alt='雪球' width={20} height={20} />
	};

	return (
		<>
			<div className='flex items-center justify-between'>
				<h2 className='text-xl font-semibold'>热点资讯</h2>
			</div>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
				<NewsCard
					title={weiboItems.title}
					type={weiboItems.id}
					bg={weiboItems.bg}
					icon={weiboItems.icon}
					color={weiboItems.color}
				/>
				<NewsCard
					title={zhihuItems.title}
					type={zhihuItems.id}
					bg={zhihuItems.bg}
					icon={zhihuItems.icon}
					color={zhihuItems.color}
				/>
				<NewsCard
					title={douyinItems.title}
					type={douyinItems.id}
					bg={douyinItems.bg}
					icon={douyinItems.icon}
					color={douyinItems.color}
				/>
				<NewsCard
					title={xueqiuItems.title}
					type={xueqiuItems.id}
					bg={xueqiuItems.bg}
					icon={xueqiuItems.icon}
					color={xueqiuItems.color}
				/>
				<NewsCard
					title={juejinItems.title}
					type={juejinItems.id}
					bg={juejinItems.bg}
					icon={juejinItems.icon}
					color={juejinItems.color}
				/>
			</div>
		</>
	);
};

export default NewsSection;