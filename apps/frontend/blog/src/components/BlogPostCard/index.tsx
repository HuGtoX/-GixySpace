import React from 'react';
import { Card, Tag } from 'antd';

type BlogPostCardProps = {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  tags: string[];
};

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  date, 
  category, 
  title, 
  excerpt, 
  tags 
}) => {
  return (
    <Card className="bg-darkGray rounded-xl hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-secondary">{date}</span>
        <Tag color="blue">{category}</Tag>
      </div>
      <h3 className="text-xl font-bold text-lightGray mb-2">{title}</h3>
      <p className="text-secondary mb-4">{excerpt}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <Tag key={index} className="bg-dark text-secondary">{tag}</Tag>
          ))}
        </div>
        <a href="#" className="text-primary hover:underline">阅读更多 →</a>
      </div>
    </Card>
  );
};

export default BlogPostCard;