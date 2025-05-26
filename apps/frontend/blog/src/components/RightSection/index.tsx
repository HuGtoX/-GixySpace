import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import { Card, Divider, Tag } from 'antd';
import CategoryNav from '@components/CategoryNav';

interface RightSectionProps {
	children?: ReactNode;
}

const tags = [
	'JavaScript',
	'React',
	'Node.js',
	'Golang',
	'Docker',
	'Kubernetes'
];
const articles = [
	{ title: 'TypeScript高级技巧与实践', date: '2023年8月20日', url: '' },
	{ title: '微前端架构设计与实现', date: '2023年7月15日', url: '' },
	{ title: 'Serverless架构实战经验', date: '2023年6月30日', url: '' }
];

const RightSection: FC<RightSectionProps> = () => {
	return (
		<div className="w-full md:w-1/3 mt-8 md:mt-0">
			{/* 关于我 */}
			<Card className="dark:bg-darkGray rounded-xl mb-6">
				<h3 className="text-lg font-bold dark:text-lightGray mb-4">关于我</h3>
				<p className="dark:text-secondary mb-4">
					8年全栈开发经验，专注于Web技术栈，热爱分享技术知识与实践经验。目前在知名互联网公司担任高级技术专家。
				</p>
				<div className="flex flex-wrap gap-2">
					{tags.map((tag) => (
						<Tag className="dark:bg-dark dark:text-secondary" key={tag}>
							{tag}
						</Tag>
					))}
				</div>
			</Card>

			{/* 分类导航（使用组件） */}
			<CategoryNav
				title="分类"
				categories={[
					{ name: '前端开发', count: 12, url: '' },
					{ name: '后端开发', count: 8, url: '' },
					{ name: 'DevOps', count: 5, url: '' },
					{ name: '数据库', count: 3, url: '' },
					{ name: '架构设计', count: 4, url: '' }
				]}
			/>

			{/* 热门文章 */}
			<Card className="dark:bg-darkGray rounded-xl">
				<h3 className="text-lg font-bold  dark:text-lightGray mb-4">
					热门文章
				</h3>
				<div className="space-y-4">
					{articles.map((article, index) => (
						<Fragment key={index}>
							<a
								href={article.url}
								className="block dark:text-secondary hover:text-primary"
							>
								<h4 className="font-medium">{article.title}</h4>
								<p className="text-xs text-secondary">{article.date}</p>
							</a>
							{index < articles.length - 1 && <Divider className="my-2" />}
						</Fragment>
					))}
				</div>
			</Card>
		</div>
	);
};

export default RightSection;
