import React from 'react';
import { Card, Divider, Tag } from 'antd';
import {
	GithubOutlined,
	ZhihuOutlined,
	TwitterOutlined
} from '@ant-design/icons';
// 引入封装的组件
import Nav from '@components/Nav';
import ProfileCard from '@components/ProfileCard';
import BlogPostCard from '@components/BlogPostCard';
import FooterNav from './components/FooterNav';
import ProjectCard from '@components/ProjectCard';
import Pagination from '@components/Pagination';
import CategoryNav from '@components/CategoryNav';

const ProgrammerBlog: React.FC = () => {
	// 导航链接数据
	const navLinks = [
		{ text: '首页', href: '#' },
		{ text: '博客', href: '#' },
		{ text: '项目', href: '#' },
		{ text: '关于我', href: '#' }
	];

	// 个人信息数据
	const profileData = {
		avatar:
			'https://ai-public.mastergo.com/ai/img_res/5e1757883851d1c7351dbec17e92f589.jpg',
		name: '张明远',
		title: '全栈工程师 | 技术博主 | 开源贡献者',
		socialLinks: [
			{ icon: <GithubOutlined className="text-xl" />, href: '#' },
			{ icon: <i className="fab fa-juejin text-xl"></i>, href: '#' },
			{ icon: <ZhihuOutlined className="text-xl" />, href: '#' },
			{ icon: <TwitterOutlined className="text-xl" />, href: '#' }
		]
	};

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
			excerpt:
				'本文详细介绍了如何在Kubernetes环境中构建完整的微服务监控体系...',
			tags: ['Kubernetes', '监控', 'DevOps']
		}
	];

	return (
		<div className="min-h-screen bg-dark text-lightGray">
			{/* 导航栏组件 */}
			<Nav links={navLinks} />

			{/* 主要内容区 */}
			<div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row">
				{/* 左侧内容区 */}
				<div className="w-full md:w-2/3 md:pr-8">
					{/* 个人信息组件 */}
					<ProfileCard {...profileData} />

					{/* 博客文章列表（使用文章卡片组件） */}
					<h2 className="text-2xl font-bold text-lightGray mb-6">最新文章</h2>
					<div className="space-y-6">
						{blogPosts.map((post, index) => (
							<BlogPostCard key={index} {...post} />
						))}
					</div>

					<Pagination currentPage={1} totalPages={3} />
				</div>

				{/* 右侧边栏（可进一步拆分，此处保持原有结构） */}
				<div className="w-full md:w-1/3 mt-8 md:mt-0">
					{/* 关于我 */}
					<Card className="bg-darkGray rounded-xl mb-6">
						<h3 className="text-lg font-bold text-lightGray mb-4">关于我</h3>
						<p className="text-secondary mb-4">
							8年全栈开发经验，专注于Web技术栈，热爱分享技术知识与实践经验。目前在知名互联网公司担任高级技术专家。
						</p>
						<div className="flex flex-wrap gap-2">
							<Tag className="bg-dark text-secondary">JavaScript</Tag>
							<Tag className="bg-dark text-secondary">React</Tag>
							<Tag className="bg-dark text-secondary">Node.js</Tag>
							<Tag className="bg-dark text-secondary">Golang</Tag>
							<Tag className="bg-dark text-secondary">Docker</Tag>
							<Tag className="bg-dark text-secondary">Kubernetes</Tag>
						</div>
					</Card>

					{/* 分类导航（使用组件） */}
					<CategoryNav
						title="分类"
						categories={[
							{ name: '前端开发', count: 12 },
							{ name: '后端开发', count: 8 },
							{ name: 'DevOps', count: 5 },
							{ name: '数据库', count: 3 },
							{ name: '架构设计', count: 4 }
						]}
					/>

					{/* 热门文章 */}
					<Card className="bg-darkGray rounded-xl">
						<h3 className="text-lg font-bold text-lightGray mb-4">热门文章</h3>
						<div className="space-y-4">
							<a href="#" className="block text-secondary hover:text-primary">
								<h4 className="font-medium">TypeScript高级技巧与实践</h4>
								<p className="text-xs text-secondary">2023年8月20日</p>
							</a>
							<Divider className="my-2 bg-dark" />
							<a href="#" className="block text-secondary hover:text-primary">
								<h4 className="font-medium">微前端架构设计与实现</h4>
								<p className="text-xs text-secondary">2023年7月15日</p>
							</a>
							<Divider className="my-2 bg-dark" />
							<a href="#" className="block text-secondary hover:text-primary">
								<h4 className="font-medium">Serverless架构实战经验</h4>
								<p className="text-xs text-secondary">2023年6月30日</p>
							</a>
						</div>
					</Card>
				</div>
			</div>

			{/* 项目展示区（使用项目卡片组件） */}
			<div className="max-w-6xl mx-auto px-6 py-12">
				<h2 className="text-2xl font-bold text-lightGray mb-8">我的项目</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<ProjectCard
						cover="https://ai-public.mastergo.com/ai/img_res/1585a18015a135beed2a2870ba7ea4a3.jpg"
						title="Admin Dashboard"
						description="基于React和Ant Design Pro构建的企业级后台管理系统，支持多租户和RBAC权限控制。"
						tags={['React', 'Ant Design']}
					/>
					<ProjectCard
						cover="https://ai-public.mastergo.com/ai/img_res/09a6c17bcc315e076b892ac17058cf05.jpg"
						title="API Gateway"
						description="基于Golang开发的微服务API网关，支持JWT认证、限流、熔断等核心功能。"
						tags={['Golang', '微服务']}
					/>
					<ProjectCard
						cover="https://ai-public.mastergo.com/ai/img_res/a3286174e513b260e99ff9113a946bfa.jpg"
						title="Real-time Chat"
						description="基于WebSocket的实时聊天应用，支持群聊、私聊、消息已读等功能。"
						tags={['Node.js', 'Socket.IO']}
					/>
				</div>
			</div>

			<FooterNav
				links={[
					{ text: '首页', href: '#' },
					{ text: '博客', href: '#' },
					{ text: '项目', href: '#' },
					{ text: '关于我', href: '#' },
					{ text: '隐私政策', href: '#' }
				]}
			/>
		</div>
	);
};

export default ProgrammerBlog;
