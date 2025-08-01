"use client";

import React from "react";
import { Result, Button } from "antd";
import Link from "next/link";

export default function AuthCodeErrorPage() {
  return (
    <div className="w-full">
      <Result
        status="error"
        title="邮箱验证失败"
        subTitle="验证链接可能已过期或无效，请重新注册或联系管理员。"
        extra={[
          <Link key="register" href="/auth/register">
            <Button type="primary">重新注册</Button>
          </Link>,
          <Link key="login" href="/auth/login">
            <Button>返回登录</Button>
          </Link>,
        ]}
      />
    </div>
  );
}
