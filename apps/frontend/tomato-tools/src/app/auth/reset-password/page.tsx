import React, { Suspense } from 'react';
import { Spin } from 'antd';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-[200px]"><Spin size="large" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}