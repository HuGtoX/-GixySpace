import type { FC, ReactNode } from 'react';
import BlogPostCard from '@components/BlogPostCard';
import Pagination from '@components/Pagination';

interface ArticleListProps {
	children?: ReactNode;
}

// 文章列表数据
const blogPosts = [
	{
		date: '2023年10月15日',
		category: '前端开发',
		title: '深入理解React Hooks原理与最佳实践',
		excerpt: '本文详细探讨了React Hooks的内部实现机制...',
		tags: ['React', 'Hooks', '前端']
	},
	{
		date: '2023年9月28日',
		category: '后端开发',
		title: 'Golang高性能Web服务优化指南',
		excerpt: '本文分享了在Go语言中构建高性能Web服务的关键优化技巧...',
		tags: ['Golang', '性能优化', 'Web服务']
	},
	{
		date: '2023年9月15日',
		category: 'DevOps',
		title: '基于Kubernetes的微服务监控体系构建',
		excerpt: '本文详细介绍了如何在Kubernetes环境中构建完整的微服务监控体系...',
		tags: ['Kubernetes', '监控', 'DevOps']
	}
];

const ArticleList: FC<ArticleListProps> = () => {
	return (
		<>
			<div className="space-y-6">
				{blogPosts.map((post, index) => (
					<BlogPostCard key={index} {...post} />
				))}
			</div>

			<Pagination currentPage={1} totalPages={3} />
		</>
	);
};

export default ArticleList;
