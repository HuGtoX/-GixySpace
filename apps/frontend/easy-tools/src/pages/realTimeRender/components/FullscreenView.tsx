import React from "react";
import { Splitter } from "antd";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";
import ToolbarButtons from "./ToolbarButtons";
import ConsolePanel, { ConsoleLog } from "./ConsolePanel";

interface FullscreenViewProps {
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  consoleLogs: ConsoleLog[];
  onClearConsole: () => void;
}

const FullscreenView: React.FC<FullscreenViewProps> = ({
  iframeRef,
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  isFullscreen,
  consoleLogs,
  onClearConsole,
}) => {
  const { isMobile } = useDeviceDetect();
  const { isDarkMode } = useTheme();

  // 预览区域样式
  const previewStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: "6px",
    backgroundColor: isDarkMode ? "#1F2937" : "#ffffff",
  };

  // 预览区域组件
  const PreviewArea = (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          预览区域
        </h3>
      </div>
      <div className="flex-1 p-2">
        <iframe
          ref={iframeRef}
          style={previewStyle}
          title="Preview"
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        />
      </div>
    </div>
  );

  // Console面板组件
  const ConsolePanelArea = (
    <ConsolePanel logs={consoleLogs} onClear={onClearConsole} />
  );

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
          {isMobile ? (
            <div className="h-full flex flex-col gap-4">
              <div style={{ height: "60%" }}>{PreviewArea}</div>
              <div style={{ height: "40%" }}>{ConsolePanelArea}</div>
            </div>
          ) : (
            <Splitter
              layout="vertical"
              className="h-full"
              style={{ height: "100%" }}
            >
              <Splitter.Panel size="65%">{PreviewArea}</Splitter.Panel>
              <Splitter.Panel size="35%">{ConsolePanelArea}</Splitter.Panel>
            </Splitter>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullscreenView;
