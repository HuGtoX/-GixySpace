import React from "react";
import { Button, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  CopyOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FormatPainterOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";

interface ToolbarButtonsProps {
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  onToggleShortcutHelp?: () => void;
  onFormat?: () => void;
  isFullscreen: boolean;
}

const ToolbarButtons: React.FC<ToolbarButtonsProps> = ({
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  onToggleShortcutHelp,
  onFormat,
  isFullscreen,
}) => {
  const { isMobile } = useDeviceDetect();
  return (
    <div className="flex gap-2">
      <Tooltip title="运行代码">
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={onRun}
          size="small"
        >
          运行
        </Button>
      </Tooltip>
      <Tooltip title="复制代码">
        <Button icon={<CopyOutlined />} onClick={onCopy} size="small">
          复制
        </Button>
      </Tooltip>
      <Tooltip title="刷新预览">
        <Button icon={<ReloadOutlined />} onClick={onRefresh} size="small">
          刷新
        </Button>
      </Tooltip>
      {onFormat && (
        <Tooltip title="格式化代码">
          <Button
            icon={<FormatPainterOutlined />}
            onClick={onFormat}
            size="small"
          >
            格式化
          </Button>
        </Tooltip>
      )}
      <Tooltip title={isFullscreen ? "退出全屏" : "全屏预览"}>
        <Button
          icon={<FullscreenOutlined />}
          onClick={onToggleFullscreen}
          size="small"
        >
          {isFullscreen ? "退出" : "全屏"}
        </Button>
      </Tooltip>
      {!isMobile && onToggleShortcutHelp && (
        <Tooltip title="快捷键帮助">
          <Button
            icon={<QuestionCircleOutlined />}
            onClick={onToggleShortcutHelp}
            size="small"
          >
            帮助
          </Button>
        </Tooltip>
      )}
    </div>
  );
};

export default ToolbarButtons;
