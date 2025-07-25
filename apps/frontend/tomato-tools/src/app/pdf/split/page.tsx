'use client';

import React from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { FileTextOutlined, ArrowLeftOutlined, ScissorOutlined } from '@ant-design/icons';
import ToolLayout from '@/components/layout/ToolLayout';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function PdfSplitPage() {
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
            <ScissorOutlined className="text-green-500" />
            PDF 拆分工具
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300">
            将PDF文件拆分为多个单独的页面
          </Paragraph>
        </div>

        <Card className="text-center py-12">
          <Space direction="vertical" size="large">
            <ScissorOutlined className="text-6xl text-green-500" />
            <Title level={3}>PDF 拆分功能</Title>
            <Paragraph className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              此功能正在开发中，敬请期待！
              <br />
              将支持上传PDF文件并拆分为单独的页面文件。
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