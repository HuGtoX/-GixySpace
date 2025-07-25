'use client';

import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { PictureOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import ToolLayout from '@/components/layout/ToolLayout';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function ImageTransformPage() {
  return (
    <ToolLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button icon={<ArrowLeftOutlined />} className="mb-4">
              返回首页
            </Button>
          </Link>
          <Title level={2} className="flex items-center gap-3">
            <PictureOutlined className="text-purple-500" />
            图片转换工具
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300">
            支持多种图片格式之间的转换
          </Paragraph>
        </div>

        <Card className="text-center py-12">
          <Space direction="vertical" size="large">
            <PictureOutlined className="text-6xl text-purple-500" />
            <Title level={3}>图片转换功能</Title>
            <Paragraph className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              此功能正在开发中，敬请期待！
              <br />
              将支持JPG、PNG、WebP、GIF等多种格式之间的转换。
            </Paragraph>
            <Button type="primary" size="large" disabled>
              功能开发中
            </Button>
          </Space>
        </Card>
      </div>
    </ToolLayout>
  );
}