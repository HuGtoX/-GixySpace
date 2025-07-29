'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Alert, Card } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface ResetPasswordFormData {
  email: string;
}

interface UpdatePasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form] = Form.useForm();

  // 检查是否有重置令牌（更新密码模式）
  React.useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setIsUpdateMode(true);
    }
  }, [searchParams]);

  const handleResetRequest = async (values: ResetPasswordFormData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values: UpdatePasswordFormData) => {
    setLoading(true);
    setError(null);

    try {
      const token = searchParams.get('token');
      if (!token) {
        throw new Error('Invalid reset token');
      }

      const response = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: values.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setSuccess(true);
      // 延迟跳转到登录页面
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card title={isUpdateMode ? "密码更新成功" : "重置邮件已发送"} className="w-full max-w-md mx-auto">
        <Alert
          message={isUpdateMode ? "密码更新成功！" : "重置邮件已发送！"}
          description={
            isUpdateMode 
              ? "您的密码已成功更新。正在跳转到登录页面..."
              : "请检查您的邮箱并点击重置链接来更新密码。"
          }
          type="success"
          showIcon
        />
        {!isUpdateMode && (
          <div className="text-center mt-4">
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
              返回登录
            </Link>
          </div>
        )}
      </Card>
    );
  }

  if (isUpdateMode) {
    return (
      <Card title="设置新密码" className="w-full max-w-md mx-auto">
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            className="mb-4"
          />
        )}
        
        <Form
          form={form}
          name="updatePassword"
          onFinish={handlePasswordUpdate}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="newPassword"
            label="新密码"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少需要6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入新密码（至少6个字符）"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认新密码"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: '请确认新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请再次输入新密码"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              更新密码
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  return (
    <Card title="重置密码" className="w-full max-w-md mx-auto">
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className="mb-4"
        />
      )}
      
      <Form
        form={form}
        name="resetPassword"
        onFinish={handleResetRequest}
        layout="vertical"
        size="large"
      >
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="请输入注册时使用的邮箱"
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            发送重置邮件
          </Button>
        </Form.Item>

        <div className="text-center space-y-2">
          <div>
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
              返回登录
            </Link>
          </div>
          <div>
            还没有账号？{' '}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-800">
              立即注册
            </Link>
          </div>
        </div>
      </Form>
    </Card>
  );
}