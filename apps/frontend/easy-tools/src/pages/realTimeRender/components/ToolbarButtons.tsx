import React from "react";
import { Button, Tooltip } from "antd";
import {
  PlayCircleOutlined,
  CopyOutlined,
  ReloadOutlined,
  FullscreenOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons";

interface ToolbarButtonsProps {
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  onFormat?: () => void;
  isFullscreen: boolean;
}

const ToolbarButtons: React.FC<ToolbarButtonsProps> = ({
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  onFormat,
  isFullscreen,
}) => {
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
    </div>
  );
};

export default ToolbarButtons;
