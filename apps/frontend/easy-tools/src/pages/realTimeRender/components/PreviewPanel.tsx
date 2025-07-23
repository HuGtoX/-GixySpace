import React from "react";
import { Card } from "antd";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";

interface PreviewPanelProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onIframeLoad: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  iframeRef,
  onIframeLoad,
}) => {
  const { isMobile } = useDeviceDetect();
  const { isDarkMode } = useTheme();

  // 预览区域样式
  const previewStyle = {
    width: "100%",
    height: isMobile ? "400px" : "100%",
    border: "none",
    borderRadius: "6px",
    backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
  };

  return (
    <Card
      title="实时预览"
      extra={
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            自动更新
          </span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      }
      className="h-full flex flex-col"
      styles={{
        body: {
          padding: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <iframe
        ref={iframeRef}
        style={previewStyle}
        title="Preview"
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        onLoad={onIframeLoad}
      />
    </Card>
  );
};

export default PreviewPanel;