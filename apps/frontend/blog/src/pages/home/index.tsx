import React from 'react';
import {
	GithubOutlined,
	ZhihuOutlined,
	TwitterOutlined
} from '@ant-design/icons';
import Nav from '@components/Nav';
import ProfileCard from '@components/ProfileCard';
import FooterNav from './components/FooterNav';
import ProjectCard from '@components/ProjectCard';
import RightSection from '@/components/RightSection';
import ArticleList from '@/components/ArticleList';

const ProgrammerBlog: React.FC = () => {
	// 个人信息数据
	const profileData = {
		avatar: '/avatar.jpg',
		name: 'Gixy',
		title: '全栈工程师 | 技术博主 | 开源贡献者',
		socialLinks: [
			{ icon: <GithubOutlined className="text-xl" />, href: '#' },
			{ icon: <ZhihuOutlined className="text-xl" />, href: '#' },
			{ icon: <TwitterOutlined className="text-xl" />, href: '#' }
		]
	};

	return (
		<div className="min-h-screen bg-[#F1F3F5] text-gray-800 dark:bg-dark dark:text-lightGray">
			{/* 导航栏组件 */}
			<Nav />

			{/* 主要内容区 */}
			<div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row">
				{/* 左侧内容区 */}
				<div className="w-full md:w-2/3 md:pr-8">
					{/* 个人信息组件 */}
					<ProfileCard {...profileData} />
					{/* 博客文章列表 */}
					<ArticleList />
				</div>
				{/* 右侧边栏 */}
				<RightSection />
			</div>

			{/* 项目展示区（使用项目卡片组件） */}
			<div className="max-w-6xl mx-auto px-6 py-12">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-lightGray mb-8">我的项目</h2>
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
