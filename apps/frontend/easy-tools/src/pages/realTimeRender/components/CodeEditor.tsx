import React, { useRef } from "react";
import { Card } from "antd";
import Editor from "@monaco-editor/react";
import { useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useTheme } from "../../../context/ThemeContext";
import ToolbarButtons from "./ToolbarButtons";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  onRun: () => void;
  onCopy: () => void;
  onRefresh: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  onRun,
  onCopy,
  onRefresh,
  onToggleFullscreen,
  isFullscreen,
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
    minimap: { enabled: false },
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
    glyphMargin: false,
    folding: false,
    lineNumbers: "on" as const,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
  };

  return (
    <Card
      title="代码编辑器"
      extra={
        <ToolbarButtons
          onRun={onRun}
          onCopy={onCopy}
          onRefresh={onRefresh}
          onFormat={handleFormat}
          onToggleFullscreen={onToggleFullscreen}
          isFullscreen={isFullscreen}
        />
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
        onMount={(editor) => {
          editorRef.current = editor;
        }}
        beforeMount={(monaco) => {
          // 配置 TypeScript 编译选项以支持 JSX
          monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.Latest,
            allowNonTsExtensions: true,
            moduleResolution:
              monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            jsx: monaco.languages.typescript.JsxEmit.React,
            reactNamespace: "React",
            allowJs: true,
            typeRoots: ["node_modules/@types"],
          });

          // 添加 React 和 CSS 类型定义
          const reactTypes = `
            declare module 'react' {
              export interface FC<P = {}> {
                (props: P): JSX.Element | null;
              }
              export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((prev: T) => T)) => void];
              export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
              export function useRef<T>(initialValue: T): { current: T };
              export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
              export function useMemo<T>(factory: () => T, deps: any[]): T;
              export const Fragment: FC<{ children?: any }>;
            }
            declare global {
              namespace JSX {
                interface Element {}
                interface IntrinsicElements {
                  [elemName: string]: {
                    style?: React.CSSProperties;
                    className?: string;
                    children?: any;
                    [key: string]: any;
                  };
                }
              }
              namespace React {
                interface CSSProperties {
                  alignContent?: string;
                  alignItems?: string;
                  alignSelf?: string;
                  animation?: string;
                  animationDelay?: string;
                  animationDirection?: string;
                  animationDuration?: string;
                  animationFillMode?: string;
                  animationIterationCount?: string;
                  animationName?: string;
                  animationPlayState?: string;
                  animationTimingFunction?: string;
                  backfaceVisibility?: string;
                  background?: string;
                  backgroundAttachment?: string;
                  backgroundClip?: string;
                  backgroundColor?: string;
                  backgroundImage?: string;
                  backgroundOrigin?: string;
                  backgroundPosition?: string;
                  backgroundRepeat?: string;
                  backgroundSize?: string;
                  border?: string;
                  borderBottom?: string;
                  borderBottomColor?: string;
                  borderBottomLeftRadius?: string;
                  borderBottomRightRadius?: string;
                  borderBottomStyle?: string;
                  borderBottomWidth?: string;
                  borderCollapse?: string;
                  borderColor?: string;
                  borderLeft?: string;
                  borderLeftColor?: string;
                  borderLeftStyle?: string;
                  borderLeftWidth?: string;
                  borderRadius?: string;
                  borderRight?: string;
                  borderRightColor?: string;
                  borderRightStyle?: string;
                  borderRightWidth?: string;
                  borderSpacing?: string;
                  borderStyle?: string;
                  borderTop?: string;
                  borderTopColor?: string;
                  borderTopLeftRadius?: string;
                  borderTopRightRadius?: string;
                  borderTopStyle?: string;
                  borderTopWidth?: string;
                  borderWidth?: string;
                  bottom?: string;
                  boxShadow?: string;
                  boxSizing?: string;
                  captionSide?: string;
                  clear?: string;
                  clip?: string;
                  color?: string;
                  columnCount?: string;
                  columnFill?: string;
                  columnGap?: string;
                  columnRule?: string;
                  columnRuleColor?: string;
                  columnRuleStyle?: string;
                  columnRuleWidth?: string;
                  columnSpan?: string;
                  columnWidth?: string;
                  columns?: string;
                  content?: string;
                  counterIncrement?: string;
                  counterReset?: string;
                  cursor?: string;
                  direction?: string;
                  display?: string;
                  emptyCells?: string;
                  filter?: string;
                  flex?: string;
                  flexBasis?: string;
                  flexDirection?: string;
                  flexFlow?: string;
                  flexGrow?: string;
                  flexShrink?: string;
                  flexWrap?: string;
                  float?: string;
                  font?: string;
                  fontFamily?: string;
                  fontSize?: string;
                  fontStyle?: string;
                  fontVariant?: string;
                  fontWeight?: string;
                  height?: string;
                  justifyContent?: string;
                  left?: string;
                  letterSpacing?: string;
                  lineHeight?: string;
                  listStyle?: string;
                  listStyleImage?: string;
                  listStylePosition?: string;
                  listStyleType?: string;
                  margin?: string;
                  marginBottom?: string;
                  marginLeft?: string;
                  marginRight?: string;
                  marginTop?: string;
                  maxHeight?: string;
                  maxWidth?: string;
                  minHeight?: string;
                  minWidth?: string;
                  opacity?: string;
                  order?: string;
                  outline?: string;
                  outlineColor?: string;
                  outlineOffset?: string;
                  outlineStyle?: string;
                  outlineWidth?: string;
                  overflow?: string;
                  overflowX?: string;
                  overflowY?: string;
                  padding?: string;
                  paddingBottom?: string;
                  paddingLeft?: string;
                  paddingRight?: string;
                  paddingTop?: string;
                  pageBreakAfter?: string;
                  pageBreakBefore?: string;
                  pageBreakInside?: string;
                  perspective?: string;
                  perspectiveOrigin?: string;
                  position?: string;
                  quotes?: string;
                  resize?: string;
                  right?: string;
                  tableLayout?: string;
                  textAlign?: string;
                  textAlignLast?: string;
                  textDecoration?: string;
                  textDecorationColor?: string;
                  textDecorationLine?: string;
                  textDecorationStyle?: string;
                  textIndent?: string;
                  textJustify?: string;
                  textOverflow?: string;
                  textShadow?: string;
                  textTransform?: string;
                  top?: string;
                  transform?: string;
                  transformOrigin?: string;
                  transformStyle?: string;
                  transition?: string;
                  transitionDelay?: string;
                  transitionDuration?: string;
                  transitionProperty?: string;
                  transitionTimingFunction?: string;
                  unicodeBidi?: string;
                  verticalAlign?: string;
                  visibility?: string;
                  whiteSpace?: string;
                  width?: string;
                  wordBreak?: string;
                  wordSpacing?: string;
                  wordWrap?: string;
                  zIndex?: string;
                  [key: string]: any;
                }
              }
            }
          `;

          monaco.languages.typescript.typescriptDefaults.addExtraLib(
            reactTypes,
            "file:///node_modules/@types/react/index.d.ts",
          );
        }}
      />
    </Card>
  );
};

export default CodeEditor;
