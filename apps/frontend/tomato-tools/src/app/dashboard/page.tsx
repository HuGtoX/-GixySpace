"use client";

import React from "react";
import { Card, Button, Avatar, Descriptions, Spin } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">仪表板</h1>
          <p className="mt-2 text-gray-600">
            欢迎回来，{user.fullName || user.email}！
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 用户信息卡片 */}
          <Card
            title="用户信息"
            className="lg:col-span-2"
            extra={
              <Button
                type="primary"
                danger
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                登出
              </Button>
            }
          >
            <div className="flex items-start space-x-4">
              <Avatar size={64} src={user.avatarUrl} icon={<UserOutlined />} />
              <div className="flex-1">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="姓名">
                    {user.fullName || "未设置"}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱">
                    {user.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="邮箱状态">
                    {user.emailConfirmed ? (
                      <span className="text-green-600">已验证</span>
                    ) : (
                      <span className="text-orange-600">待验证</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="角色">
                    {user.role === "admin" ? "管理员" : "用户"}
                  </Descriptions.Item>
                  <Descriptions.Item label="账户状态">
                    {user.isActive ? (
                      <span className="text-green-600">活跃</span>
                    ) : (
                      <span className="text-red-600">已禁用</span>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="注册时间">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("zh-CN")
                      : "未知"}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Card>

          {/* 快速操作 */}
          <Card title="快速操作">
            <div className="space-y-3">
              <Button type="default" block>
                编辑个人资料
              </Button>
              <Button type="default" block>
                账户设置
              </Button>
              <Button type="default" block>
                安全设置
              </Button>
            </div>
          </Card>
        </div>

        {/* 用户配置信息 */}
        {user.profile && (
          <Card title="个人资料" className="mt-6">
            <Descriptions column={2}>
              <Descriptions.Item label="个人简介">
                {user.profile.bio || "未设置"}
              </Descriptions.Item>
              <Descriptions.Item label="网站">
                {user.profile.website || "未设置"}
              </Descriptions.Item>
              <Descriptions.Item label="位置">
                {user.profile.location || "未设置"}
              </Descriptions.Item>
              <Descriptions.Item label="偏好设置">
                {user.profile.preferences ? "已配置" : "未配置"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {/* 工具快捷入口 */}
        <Card title="工具箱" className="mt-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Button
              type="dashed"
              className="flex h-20 flex-col items-center justify-center"
            >
              <span className="mb-1 text-lg">📄</span>
              <span>PDF工具</span>
            </Button>
            <Button
              type="dashed"
              className="flex h-20 flex-col items-center justify-center"
            >
              <span className="mb-1 text-lg">🖼️</span>
              <span>图片工具</span>
            </Button>
            <Button
              type="dashed"
              className="flex h-20 flex-col items-center justify-center"
            >
              <span className="mb-1 text-lg">📝</span>
              <span>文本工具</span>
            </Button>
            <Button
              type="dashed"
              className="flex h-20 flex-col items-center justify-center"
            >
              <span className="mb-1 text-lg">🔧</span>
              <span>其他工具</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
