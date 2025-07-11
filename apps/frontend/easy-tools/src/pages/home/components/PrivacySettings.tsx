import { Switch, Card, Alert } from "antd";
import { useState } from "react";

const PrivacySettings = () => {
  const [trackingEnabled, setTrackingEnabled] = useState(
    localStorage.getItem("tracking_consent") !== "false",
  );

  const handleTrackingChange = (checked) => {
    setTrackingEnabled(checked);
    localStorage.setItem("tracking_consent", checked.toString());

    if (!checked) {
      localStorage.removeItem("user_fingerprint");
    }
  };

  return (
    <Card title="隐私设置" className="mx-auto max-w-2xl">
      <Alert
        message="我们重视您的隐私"
        description="我们仅收集匿名使用数据以改进产品体验，不会收集任何个人身份信息。"
        type="info"
        showIcon
        className="mb-6"
      />

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <h3 className="text-lg font-medium">允许使用情况跟踪</h3>
          <p className="mt-1 text-gray-600">
            帮助我们改进产品体验（匿名数据收集）
          </p>
        </div>
        <Switch checked={trackingEnabled} onChange={handleTrackingChange} />
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>您可以随时在此页面更改您的隐私设置。</p>
        <p className="mt-2">要完全删除您的数据，请联系 support@yoursite.com</p>
      </div>
    </Card>
  );
};

export default PrivacySettings;
