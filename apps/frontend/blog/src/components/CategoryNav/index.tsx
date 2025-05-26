import React from 'react';
import { Card, Divider } from 'antd';

type CategoryItem = {
	name: string; // 分类名称
	count: number; // 分类文章数量
	url: string; // 分类链接
};

type CategoryNavProps = {
	title: string; // 卡片标题
	categories: CategoryItem[]; // 分类数据数组
};

const CategoryNav: React.FC<CategoryNavProps> = ({ title, categories }) => {
	return (
		<Card className="bg-white dark:bg-darkGray rounded-xl mb-6">
			<h3 className="text-lg font-bold dark:text-lightGray mb-4">{title}</h3>
			<div className="space-y-2">
				{categories.map((category, index) => (
					<React.Fragment key={category.name}>
						<a
							href={category.url}
							className="flex justify-between items-center dark:text-secondary hover:text-primary"
						>
							<span>{category.name}</span>
							<span className="text-xs dark:bg-dark px-2 py-1 rounded-full">
								{category.count}
							</span>
						</a>
						{/* 最后一个分类不显示分隔线 */}
						{index !== categories.length - 1 && (
							<Divider className="my-2 " />
						)}
					</React.Fragment>
				))}
			</div>
		</Card>
	);
};

export default CategoryNav;
