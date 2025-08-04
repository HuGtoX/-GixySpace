"use client";

import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { FileTextOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Paragraph } = Typography;

export default function PdfConcatPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />} className="mb-4">
            返回首页
          </Button>
        </Link>
        <Title level={2} className="flex items-center gap-3">
          <FileTextOutlined className="text-blue-500" />
          PDF 合并工具
        </Title>
        <Paragraph className="text-gray-600 dark:text-gray-300">
          将多个PDF文件合并为一个文件
        </Paragraph>
      </div>

      <Card className="py-12 text-center">
        <Space direction="vertical" size="large">
          <FileTextOutlined className="text-6xl text-blue-500" />
          <Title level={3}>PDF 合并功能</Title>
          <Paragraph className="mx-auto max-w-md text-gray-600 dark:text-gray-300">
            此功能正在开发中，敬请期待！
            <br />
            将支持拖拽上传多个PDF文件并合并为一个文件。
          </Paragraph>
          <Button type="primary" size="large" disabled>
            功能开发中
          </Button>
        </Space>
      </Card>
    </div>
  );
}
