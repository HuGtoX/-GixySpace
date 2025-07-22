import React from "react";
import { Card } from "antd";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";

type RenderStatus = 'idle' | 'compiling' | 'rendering' | 'completed' | 'error';

interface PreviewPanelProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onIframeLoad: () => void;
  renderStatus?: RenderStatus;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  iframeRef,
  onIframeLoad,
  renderStatus = 'idle',
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
          {renderStatus === 'idle' && (
            <>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                就绪
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
            </>
          )}
          {renderStatus === 'compiling' && (
            <>
              <span className="text-xs text-blue-600 dark:text-blue-400">
                编译中
              </span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            </>
          )}
          {renderStatus === 'rendering' && (
            <>
              <span className="text-xs text-orange-600 dark:text-orange-400">
                渲染中
              </span>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-spin" />
            </>
          )}
          {renderStatus === 'completed' && (
            <>
              <span className="text-xs text-green-600 dark:text-green-400">
                渲染完成
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </>
          )}
          {renderStatus === 'error' && (
            <>
              <span className="text-xs text-red-600 dark:text-red-400">
                渲染错误
              </span>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            </>
          )}
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