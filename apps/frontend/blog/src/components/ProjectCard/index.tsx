import React from 'react';
import { Card, Tag } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

type ProjectCardProps = {
	cover: string; // 项目封面图链接
	title: string; // 项目标题
	description: string; // 项目描述
	tags: string[]; // 项目标签数组
};

const ProjectCard: React.FC<ProjectCardProps> = ({
	cover,
	title,
	description,
	tags
}) => {
	return (
		<Card
			className="bg-white dark:bg-darkGray rounded-xl overflow-hidden hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
			cover={
				<div className="h-48 overflow-hidden">
					<img
						src={cover}
						alt="项目截图"
						className="w-full h-full object-cover"
					/>
				</div>
			}
		>
			<div className="p-6">
				<h3 className="text-xl font-bold dark:text-lightGray mb-2">{title}</h3>
				<p className="text-secondary mb-4">{description}</p>
				<div className="flex justify-between items-center">
					<div className="flex space-x-2">
						{tags.map((tag, index) => (
							<Tag key={index} className="dark:bg-dark dark:text-secondary">
								{tag}
							</Tag>
						))}
					</div>
					<a href="#" className="text-primary hover:underline">
						<GithubOutlined />
					</a>
				</div>
			</div>
		</Card>
	);
};

export default ProjectCard;
