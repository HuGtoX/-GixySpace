import React from "react";
import { Modal, Table } from "antd";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";

interface ShortcutHelpProps {
  visible: boolean;
  onClose: () => void;
}

const ShortcutHelp: React.FC<ShortcutHelpProps> = ({ visible, onClose }) => {
  const { isMobile } = useDeviceDetect();

  // 快捷键数据
  const shortcuts = [
    {
      key: "1",
      action: "运行代码",
      shortcut: "Ctrl + Enter / Cmd + Enter",
      description: "立即执行当前代码",
    },
    {
      key: "2",
      action: "格式化代码",
      shortcut: "Shift + Alt + F / Shift + Option + F",
      description: "自动格式化代码",
    },
    {
      key: "3",
      action: "查找",
      shortcut: "Ctrl + F / Cmd + F",
      description: "在代码中查找文本",
    },
    {
      key: "4",
      action: "替换",
      shortcut: "Ctrl + H / Cmd + Option + F",
      description: "查找并替换文本",
    },
    {
      key: "5",
      action: "注释/取消注释",
      shortcut: "Ctrl + / / Cmd + /",
      description: "切换行注释",
    },
    {
      key: "6",
      action: "块注释",
      shortcut: "Shift + Alt + A / Shift + Option + A",
      description: "切换块注释",
    },
    {
      key: "7",
      action: "撤销",
      shortcut: "Ctrl + Z / Cmd + Z",
      description: "撤销上一步操作",
    },
    {
      key: "8",
      action: "重做",
      shortcut: "Ctrl + Y / Cmd + Shift + Z",
      description: "重做上一步操作",
    },
    {
      key: "9",
      action: "全选",
      shortcut: "Ctrl + A / Cmd + A",
      description: "选择全部代码",
    },
    {
      key: "10",
      action: "复制",
      shortcut: "Ctrl + C / Cmd + C",
      description: "复制选中内容",
    },
    {
      key: "11",
      action: "粘贴",
      shortcut: "Ctrl + V / Cmd + V",
      description: "粘贴剪贴板内容",
    },
    {
      key: "12",
      action: "保存",
      shortcut: "Ctrl + S / Cmd + S",
      description: "保存当前代码（触发运行）",
    },
    {
      key: "13",
      action: "多光标选择",
      shortcut: "Alt + Click / Option + Click",
      description: "添加多个光标",
    },
    {
      key: "14",
      action: "选择相同内容",
      shortcut: "Ctrl + D / Cmd + D",
      description: "选择下一个相同的单词",
    },
    {
      key: "15",
      action: "移动行",
      shortcut: "Alt + ↑/↓ / Option + ↑/↓",
      description: "向上/向下移动当前行",
    },
    {
      key: "16",
      action: "复制行",
      shortcut: "Shift + Alt + ↑/↓ / Shift + Option + ↑/↓",
      description: "向上/向下复制当前行",
    },
    {
      key: "17",
      action: "删除行",
      shortcut: "Ctrl + Shift + K / Cmd + Shift + K",
      description: "删除当前行",
    },
    {
      key: "18",
      action: "跳转到行",
      shortcut: "Ctrl + G / Cmd + G",
      description: "跳转到指定行号",
    },
  ];

  const columns = [
    {
      title: "功能",
      dataIndex: "action",
      key: "action",
      width: "25%",
      render: (text: string) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {text}
        </span>
      ),
    },
    {
      title: "快捷键",
      dataIndex: "shortcut",
      key: "shortcut",
      width: "35%",
      render: (text: string) => (
        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono">
          {text}
        </code>
      ),
    },
    {
      title: "说明",
      dataIndex: "description",
      key: "description",
      width: "40%",
      render: (text: string) => (
        <span className="text-gray-600 dark:text-gray-400">{text}</span>
      ),
    },
  ];

  // 移动端不显示快捷键帮助
  if (isMobile) {
    return null;
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">⌨️ 快捷键帮助</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className="shortcut-help-modal"
    >
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-400">
          以下是代码编辑器中可用的快捷键，可以大大提高您的编码效率：
        </p>
      </div>

      <Table
        dataSource={shortcuts}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ y: 400 }}
        className="shortcut-table"
      />

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300 mb-0">
          💡 <strong>提示：</strong>大部分快捷键在 Windows/Linux 上使用 Ctrl，在
          macOS 上使用 Cmd。
        </p>
      </div>
    </Modal>
  );
};

export default ShortcutHelp;
