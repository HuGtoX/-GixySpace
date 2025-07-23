import React from "react";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";
import ToolbarButtons from "./ToolbarButtons";

interface FullscreenViewProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const FullscreenView: React.FC<FullscreenViewProps> = ({
  iframeRef,
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  isFullscreen,
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
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900">
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            实时预览 - 全屏模式
          </h2>
          <ToolbarButtons
            onRun={onRun}
            onCopy={onCopy}
            onRefresh={onRefresh}
            onToggleFullscreen={onToggleFullscreen}
            isFullscreen={isFullscreen}
          />
        </div>
        <div className="flex-1 p-4">
          <iframe
            ref={iframeRef}
            style={previewStyle}
            title="Preview"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
          />
        </div>
      </div>
    </div>
  );
};

export default FullscreenView;
