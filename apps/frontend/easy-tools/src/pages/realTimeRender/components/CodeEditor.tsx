import React, { useRef } from "react";
import { Card } from "antd";
import Editor from "@monaco-editor/react";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";
import ToolbarButtons from "./ToolbarButtons";
import ShortcutHelp from "./ShortcutHelp";
import { MonacoEditorConfig } from "./monacoConfig";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  onToggleShortcutHelp?: () => void;
  isFullscreen: boolean;
  showShortcutHelp?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  onToggleShortcutHelp,
  isFullscreen,
  showShortcutHelp = false,
}) => {
  const { isMobile } = useDeviceDetect();
  const { isDarkMode } = useTheme();
  const editorRef = useRef<any>(null);

  // 格式化代码函数
  const handleFormat = async () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      await editor.getAction("editor.action.formatDocument").run();
    }
  };

  // Monaco Editor 配置
  const editorOptions = {
    minimap: { enabled: !isMobile },
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    lineHeight: 1.5,
    wordWrap: "on" as const,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    renderLineHighlight: "line" as const,
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line" as const,
    glyphMargin: true,
    folding: true, // 启用代码折叠
    foldingStrategy: "indentation" as const,
    showFoldingControls: "always" as const,
    lineNumbers: "on" as const,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    // 智能提示配置
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on" as const,
    acceptSuggestionOnCommitCharacter: true,
    snippetSuggestions: "top" as const,
    wordBasedSuggestions: "allDocuments" as const,
    // 语法检查
    renderValidationDecorations: "on" as const,
    // 括号匹配
    matchBrackets: "always" as const,
    // 自动缩进
    autoIndent: "full" as const,
    // 格式化
    formatOnPaste: true,
    formatOnType: true,
    // 查找替换
    find: {
      addExtraSpaceOnTop: false,
      autoFindInSelection: "never" as const,
      seedSearchStringFromSelection: "always" as const,
    },
  };

  // Monaco实例引用
  const monacoRef = useRef<any>(null);

  return (
    <>
      <Card
        title="代码编辑器"
        extra={
          <ToolbarButtons
            onRun={onRun}
            onCopy={onCopy}
            onRefresh={onRefresh}
            onFormat={handleFormat}
            onToggleFullscreen={onToggleFullscreen}
            onToggleShortcutHelp={onToggleShortcutHelp}
            isFullscreen={isFullscreen}
          />
        }
        className="flex h-full flex-col"
        styles={{
          body: {
            padding: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Editor
          height={isMobile ? "300px" : "100%"}
          defaultLanguage="typescript"
          defaultPath="file:///main.tsx"
          value={code}
          onChange={(value) => onChange(value || "")}
          theme={isDarkMode ? "vs-dark" : "vs-light"}
          options={editorOptions}
          loading={
            <div style={{ padding: "20px", textAlign: "center" }}>
              加载编辑器中...
            </div>
          }
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monacoRef.current = monaco;

            // 添加自定义快捷键
            editor.addCommand(
              // Ctrl+Enter / Cmd+Enter 运行代码
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
              () => {
                onRun();
              },
            );

            // Ctrl+S / Cmd+S 保存并运行
            editor.addCommand(
              monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
              () => {
                onRun();
              },
            );
          }}
          beforeMount={(monaco) => {
            // 初始化 Monaco 编辑器配置
            MonacoEditorConfig.initializeAll(monaco);
          }}
        />
      </Card>

      {/* 快捷键帮助面板 */}
      <ShortcutHelp
        visible={showShortcutHelp}
        onClose={() => onToggleShortcutHelp?.()}
      />
    </>
  );
};

export default CodeEditor;
