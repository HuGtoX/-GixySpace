// Monaco Editor 类型接口定义
interface IMonacoEditor {
  addCommand(keybinding: number, handler: () => void): void;
}

interface IMonacoInstance {
  KeyMod: {
    CtrlCmd: number;
  };
  KeyCode: {
    Enter: number;
    KeyS: number;
  };
  languages: {
    typescript: {
      typescriptDefaults: {
        setCompilerOptions(options: any): void;
        setDiagnosticsOptions(options: any): void;
        addExtraLib(content: string, filePath: string): void;
      };
      ScriptTarget: {
        Latest: number;
      };
      ModuleResolutionKind: {
        NodeJs: number;
      };
      ModuleKind: {
        CommonJS: number;
      };
      JsxEmit: {
        React: number;
      };
    };
    registerCompletionItemProvider(languageId: string, provider: any): void;
    setLanguageConfiguration(languageId: string, configuration: any): void;
    CompletionItemKind: {
      Snippet: number;
      Keyword: number;
      Property: number;
    };
    CompletionItemInsertTextRule: {
      InsertAsSnippet: number;
    };
  };
}

interface IEditorOptions {
  theme: string;
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  minimap: { enabled: boolean };
  scrollBeyondLastLine: boolean;
  automaticLayout: boolean;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: string;
  lineNumbers: string;
  glyphMargin: boolean;
  folding: boolean;
  foldingStrategy: string;
  showFoldingControls: string;
  foldingImportsByDefault: boolean;
  unfoldOnClickAfterEndOfLine: boolean;
  foldingMaximumRegions: number;
  suggest: any;
  quickSuggestions: any;
  parameterHints: any;
  wordBasedSuggestions: string;
  suggestOnTriggerCharacters: boolean;
  acceptSuggestionOnEnter: string;
  acceptSuggestionOnCommitCharacter: boolean;
  snippetSuggestions: string;
  emptySelectionClipboard: boolean;
  copyWithSyntaxHighlighting: boolean;
  suggestSelection: string;
  occurrencesHighlight: boolean;
  codeLens: boolean;
  colorDecorators: boolean;
  lightbulb: any;
  matchBrackets: string;
  autoIndent: string;
  formatOnType: boolean;
  formatOnPaste: boolean;
  dragAndDrop: boolean;
  links: boolean;
  mouseWheelZoom: boolean;
  multiCursorModifier: string;
  accessibilitySupport: string;
  find: any;
}

/**
 * Monaco Editor 配置工具类
 */
export class MonacoEditorConfig {
  /**
   * 配置编辑器选项
   */
  static getEditorOptions(): IEditorOptions {
    return {
      theme: "vs-dark",
      fontSize: 14,
      lineHeight: 20,
      fontFamily: "Fira Code, Monaco, Consolas, monospace",
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: "on",
      lineNumbers: "on",
      glyphMargin: true,
      folding: true,
      foldingStrategy: "auto",
      showFoldingControls: "always",
      foldingImportsByDefault: false,
      unfoldOnClickAfterEndOfLine: true,
      foldingMaximumRegions: 5000,
      suggest: {
        showMethods: true,
        showFunctions: true,
        showConstructors: true,
        showFields: true,
        showVariables: true,
        showClasses: true,
        showStructs: true,
        showInterfaces: true,
        showModules: true,
        showProperties: true,
        showEvents: true,
        showOperators: true,
        showUnits: true,
        showValues: true,
        showConstants: true,
        showEnums: true,
        showEnumMembers: true,
        showKeywords: true,
        showText: true,
        showColors: true,
        showFiles: true,
        showReferences: true,
        showFolders: true,
        showTypeParameters: true,
        showSnippets: true,
      },
      quickSuggestions: {
        other: true,
        comments: false,
        strings: true,
      },
      parameterHints: {
        enabled: true,
      },
      wordBasedSuggestions: "allDocuments" as const,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "on",
      acceptSuggestionOnCommitCharacter: true,
      snippetSuggestions: "top",
      emptySelectionClipboard: false,
      copyWithSyntaxHighlighting: true,
      suggestSelection: "first",
      occurrencesHighlight: true,
      codeLens: true,
      colorDecorators: true,
      lightbulb: {
        enabled: true,
      },
      matchBrackets: "always",
      autoIndent: "full",
      formatOnType: true,
      formatOnPaste: true,
      dragAndDrop: true,
      links: true,
      mouseWheelZoom: true,
      multiCursorModifier: "alt",
      accessibilitySupport: "auto",
      find: {
        addExtraSpaceOnTop: false,
        autoFindInSelection: "never",
        seedSearchStringFromSelection: "always",
      },
    };
  }

  /**
   * 设置编辑器快捷键
   */
  static setupShortcuts(
    monaco: IMonacoInstance,
    editor: IMonacoEditor,
    onRun: () => void,
  ) {
    // Ctrl/Cmd + Enter 运行代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, onRun);
    // Ctrl/Cmd + S 运行代码
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, onRun);
  }

  /**
   * 配置 TypeScript 编译选项
   */
  static setupTypeScriptDefaults(monaco: IMonacoInstance) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      esModuleInterop: true,
      jsx: monaco.languages.typescript.JsxEmit.React,
      reactNamespace: "React",
      allowJs: true,
      typeRoots: ["node_modules/@types"],
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      noSuggestionDiagnostics: false,
    });
  }

  /**
   * 添加 React 类型定义
   */
  static addReactTypes(monaco: IMonacoInstance) {
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
        export function useReducer<R extends React.Reducer<any, any>>(
          reducer: R,
          initialState: React.ReducerState<R>,
          initializer?: undefined
        ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];
        export function useContext<T>(context: React.Context<T>): T;
        export function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
        export function useImperativeHandle<T, R extends T>(
          ref: React.Ref<T> | undefined,
          init: () => R,
          deps?: any[]
        ): void;
        export function useDebugValue<T>(value: T, format?: (value: T) => any): void;
        export const Fragment: FC<{ children?: any }>;
        export const StrictMode: FC<{ children?: any }>;
        export const Suspense: FC<{ children?: any; fallback?: any }>;
      }
      declare global {
        namespace JSX {
          interface Element {}
          interface IntrinsicElements {
            // HTML 标签定义
            div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
            span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
            p: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
            h1: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h2: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h4: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h5: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            h6: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
            a: React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
            img: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
            input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
            button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
            form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
            label: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
            textarea: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
            select: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
            option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
            ul: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
            ol: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
            li: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
            table: React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
            thead: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            tbody: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
            tr: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
            td: React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
            th: React.DetailedHTMLProps<React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
            nav: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            header: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            footer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            section: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            article: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            aside: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            main: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
            audio: React.DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
            canvas: React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
            svg: React.SVGProps<SVGSVGElement>;
            [elemName: string]: any;
          }
        }
        namespace React {
          type Key = string | number;
          interface RefObject<T> {
              current: T | null;
          }
          type LegacyRef<T> = string | RefObject<T>;
          interface Attributes {
              key?: Key | null;
          }
          interface ClassAttributes<T> extends Attributes {
              ref?: LegacyRef<T>;
          }
          interface DetailedHTMLProps<E extends HTMLAttributes<T>, T> extends ClassAttributes<T>, E {}
          type ReactNode = any;
          type MouseEventHandler<T> = (event: any) => void;
          type FocusEventHandler<T> = (event: any) => void;
          type ChangeEventHandler<T> = (event: any) => void;

          interface HTMLAttributes<T> {
            className?: string;
            id?: string;
            style?: CSSProperties;
            children?: ReactNode;
            onClick?: MouseEventHandler<T>;
            onMouseEnter?: MouseEventHandler<T>;
            onMouseLeave?: MouseEventHandler<T>;
            onFocus?: FocusEventHandler<T>;
            onBlur?: FocusEventHandler<T>;
            [key: string]: any;
          }
          interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
            alt?: string;
            src?: string;
            srcSet?: string;
            width?: number | string;
            height?: number | string;
            loading?: 'eager' | 'lazy';
          }
          interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
            type?: string;
            value?: string | number;
            placeholder?: string;
            disabled?: boolean;
            required?: boolean;
            name?: string;
            onChange?: ChangeEventHandler<T>;
          }
          interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
            type?: 'button' | 'submit' | 'reset';
            disabled?: boolean;
          }
          interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
            href?: string;
            target?: string;
            rel?: string;
          }
          interface CSSProperties {
           // 布局属性
            display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'none' | 'table' | 'table-cell' | 'table-row' | string;
            position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky' | string;
            top?: number | string;
            right?: number | string;
            bottom?: number | string;
            left?: number | string;
            zIndex?: number | string;
            
            // 尺寸属性
            width?: number | string;
            height?: number | string;
            minWidth?: number | string;
            minHeight?: number | string;
            maxWidth?: number | string;
            maxHeight?: number | string;
            
            // 外边距
            margin?: number | string;
            marginTop?: number | string;
            marginRight?: number | string;
            marginBottom?: number | string;
            marginLeft?: number | string;
            
            // 内边距
            padding?: number | string;
            paddingTop?: number | string;
            paddingRight?: number | string;
            paddingBottom?: number | string;
            paddingLeft?: number | string;
            
            // 边框
            border?: string;
            borderTop?: string;
            borderRight?: string;
            borderBottom?: string;
            borderLeft?: string;
            borderWidth?: number | string;
            borderStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | string;
            borderColor?: string;
            borderRadius?: number | string;
            borderTopLeftRadius?: number | string;
            borderTopRightRadius?: number | string;
            borderBottomLeftRadius?: number | string;
            borderBottomRightRadius?: number | string;
            
            // 颜色和背景
            color?: string;
            backgroundColor?: string;
            background?: string;
            backgroundImage?: string;
            backgroundSize?: 'auto' | 'cover' | 'contain' | string;
            backgroundPosition?: string;
            backgroundRepeat?: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y' | string;
            backgroundAttachment?: 'scroll' | 'fixed' | 'local' | string;
            
            // 字体和文本
            fontFamily?: string;
            fontSize?: number | string;
            fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | number | string;
            fontStyle?: 'normal' | 'italic' | 'oblique' | string;
            lineHeight?: number | string;
            textAlign?: 'left' | 'center' | 'right' | 'justify' | string;
            textDecoration?: 'none' | 'underline' | 'overline' | 'line-through' | string;
            textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize' | string;
            letterSpacing?: number | string;
            wordSpacing?: number | string;
            whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | string;
            textOverflow?: 'clip' | 'ellipsis' | string;
            
            // Flexbox
            flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse' | string;
            flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | string;
            justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | string;
            alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | string;
            alignContent?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | string;
            alignSelf?: 'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | string;
            flex?: number | string;
            flexGrow?: number;
            flexShrink?: number;
            flexBasis?: number | string;
            
            // Grid
            gridTemplateColumns?: string;
            gridTemplateRows?: string;
            gridColumn?: string;
            gridRow?: string;
            gridGap?: number | string;
            gridColumnGap?: number | string;
            gridRowGap?: number | string;
            
            // 变换和动画
            transform?: string;
            transformOrigin?: string;
            transition?: string;
            transitionProperty?: string;
            transitionDuration?: string;
            transitionTimingFunction?: string;
            transitionDelay?: string;
            animation?: string;
            animationName?: string;
            animationDuration?: string;
            animationTimingFunction?: string;
            animationDelay?: string;
            animationIterationCount?: number | 'infinite' | string;
            animationDirection?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' | string;
            animationFillMode?: 'none' | 'forwards' | 'backwards' | 'both' | string;
            animationPlayState?: 'running' | 'paused' | string;
            
            // 其他常用属性
            opacity?: number | string;
            visibility?: 'visible' | 'hidden' | 'collapse' | string;
            overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | string;
            overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | string;
            overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | string;
            cursor?: 'auto' | 'pointer' | 'default' | 'text' | 'wait' | 'crosshair' | 'not-allowed' | 'grab' | 'grabbing' | string;
            boxShadow?: string;
            outline?: string;
            outlineColor?: string;
            outlineStyle?: string;
            outlineWidth?: number | string;
            float?: 'none' | 'left' | 'right' | string;
            clear?: 'none' | 'left' | 'right' | 'both' | string;
            boxSizing?: 'content-box' | 'border-box' | string;
            resize?: 'none' | 'both' | 'horizontal' | 'vertical' | string;
            userSelect?: 'auto' | 'none' | 'text' | 'all' | string;
            pointerEvents?: 'auto' | 'none' | string;
            [key: string]: any;
          }
        }
      }
    `;

    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      reactTypes,
      "file:///node_modules/@types/react/index.d.ts",
    );
  }

  /**
   * 注册代码片段提供器
   */
  static registerSnippetProvider(monaco: IMonacoInstance) {
    monaco.languages.registerCompletionItemProvider("typescript", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestions = [
          {
            label: "useState",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText:
              "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialValue});",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useState hook",
            range: range,
          },
          {
            label: "useEffect",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText:
              "useEffect(() => {\n\t${1:// effect}\n\treturn () => {\n\t\t${2:// cleanup}\n\t};\n}, [${3:dependencies}]);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useEffect hook with cleanup",
            range: range,
          },
          {
            label: "useCallback",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText:
              "const ${1:memoizedCallback} = useCallback(\n\t(${2:params}) => {\n\t\t${3:// callback logic}\n\t},\n\t[${4:dependencies}]\n);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useCallback hook",
            range: range,
          },
          {
            label: "useMemo",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText:
              "const ${1:memoizedValue} = useMemo(() => {\n\treturn ${2:computeExpensiveValue()};\n}, [${3:dependencies}]);",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React useMemo hook",
            range: range,
          },
          {
            label: "component",
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText:
              "function ${1:ComponentName}() {\n\treturn (\n\t\t<div>\n\t\t\t${2:// JSX content}\n\t\t</div>\n\t);\n}",
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: "React functional component",
            range: range,
          },
        ];
        return { suggestions };
      },
    });
  }

  /**
   * 配置语言设置
   */
  static setupLanguageConfiguration(monaco: IMonacoInstance) {
    monaco.languages.setLanguageConfiguration("typescript", {
      autoClosingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: "`", close: "`" },
        { open: "<", close: ">", notIn: ["string"] },
      ],
      surroundingPairs: [
        { open: "{", close: "}" },
        { open: "[", close: "]" },
        { open: "(", close: ")" },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
        { open: "`", close: "`" },
        { open: "<", close: ">" },
      ],
    });
  }

  /**
   * 注册 HTML 标签和属性补全提供器
   */
  static registerHtmlCompletionProvider(monaco: IMonacoInstance) {
    monaco.languages.registerCompletionItemProvider("typescript", {
      triggerCharacters: ["<", " ", "="],
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const lineContent = model.getLineContent(position.lineNumber);
        const beforeCursor = lineContent.substring(0, position.column - 1);

        // HTML 标签补全
        if (beforeCursor.includes("<") && !beforeCursor.includes(">")) {
          const htmlTags = [
            "div",
            "span",
            "p",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "a",
            "img",
            "input",
            "button",
            "form",
            "label",
            "textarea",
            "select",
            "option",
            "ul",
            "ol",
            "li",
            "table",
            "thead",
            "tbody",
            "tr",
            "td",
            "th",
            "nav",
            "header",
            "footer",
            "section",
            "article",
            "aside",
            "main",
            "video",
            "audio",
            "canvas",
            "svg",
          ];

          const suggestions = htmlTags.map((tag) => ({
            label: tag,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: `${tag}>\${1}</${tag}>`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: `HTML ${tag} element`,
            range: range,
          }));

          return { suggestions };
        }

        // HTML 属性补全
        const tagMatch = beforeCursor.match(/<(\w+)\s+[^>]*$/);
        if (tagMatch) {
          const tagName = tagMatch[1];
          let attributes = [];

          // 通用属性
          const commonAttrs = [
            { name: "className", type: "string", desc: "CSS class name" },
            { name: "id", type: "string", desc: "Element ID" },
            { name: "style", type: "CSSProperties", desc: "Inline styles" },
            { name: "onClick", type: "function", desc: "Click event handler" },
            {
              name: "onMouseEnter",
              type: "function",
              desc: "Mouse enter event",
            },
            {
              name: "onMouseLeave",
              type: "function",
              desc: "Mouse leave event",
            },
            { name: "onFocus", type: "function", desc: "Focus event handler" },
            { name: "onBlur", type: "function", desc: "Blur event handler" },
          ];

          // 特定标签属性
          const tagSpecificAttrs = {
            img: [
              { name: "src", type: "string", desc: "Image source URL" },
              { name: "alt", type: "string", desc: "Alternative text" },
              { name: "width", type: "number | string", desc: "Image width" },
              { name: "height", type: "number | string", desc: "Image height" },
              {
                name: "loading",
                type: '"eager" | "lazy"',
                desc: "Loading behavior",
              },
            ],
            input: [
              { name: "type", type: "string", desc: "Input type" },
              { name: "value", type: "string | number", desc: "Input value" },
              { name: "placeholder", type: "string", desc: "Placeholder text" },
              { name: "disabled", type: "boolean", desc: "Disabled state" },
              { name: "required", type: "boolean", desc: "Required field" },
              { name: "name", type: "string", desc: "Input name" },
              {
                name: "onChange",
                type: "function",
                desc: "Change event handler",
              },
            ],
            button: [
              {
                name: "type",
                type: '"button" | "submit" | "reset"',
                desc: "Button type",
              },
              { name: "disabled", type: "boolean", desc: "Disabled state" },
            ],
            a: [
              { name: "href", type: "string", desc: "Link URL" },
              { name: "target", type: "string", desc: "Link target" },
              { name: "rel", type: "string", desc: "Link relationship" },
            ],
          };

          attributes = [...commonAttrs, ...(tagSpecificAttrs[tagName] || [])];

          const suggestions = attributes.map((attr) => ({
            label: attr.name,
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: `${attr.name}={\${1}}`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: `${attr.desc} (${attr.type})`,
            range: range,
          }));

          return { suggestions };
        }

        return { suggestions: [] };
      },
    });
  }

  /**
   * 注册 CSS 属性补全提供器
   */
  static registerCssCompletionProvider(monaco: IMonacoInstance) {
    monaco.languages.registerCompletionItemProvider("typescript", {
      triggerCharacters: [":", " "],
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const lineContent = model.getLineContent(position.lineNumber);
        const beforeCursor = lineContent.substring(0, position.column - 1);

        // 检查是否在 style 对象中
        if (
          beforeCursor.includes("style={{") ||
          beforeCursor.includes("style: {")
        ) {
          const cssProperties = [
            { name: "width", values: ["auto", "100%", "50px"] },
            { name: "height", values: ["auto", "100%", "50px"] },
            { name: "color", values: ["red", "blue", "green", "#000", "#fff"] },
            {
              name: "backgroundColor",
              values: ["transparent", "white", "black", "#f0f0f0"],
            },
            {
              name: "display",
              values: ["block", "inline", "flex", "grid", "none"],
            },
            {
              name: "position",
              values: ["static", "relative", "absolute", "fixed", "sticky"],
            },
            { name: "margin", values: ["0", "10px", "1rem", "auto"] },
            { name: "padding", values: ["0", "10px", "1rem"] },
            {
              name: "border",
              values: ["none", "1px solid #ccc", "2px dashed red"],
            },
            { name: "borderRadius", values: ["0", "4px", "8px", "50%"] },
            { name: "fontSize", values: ["12px", "14px", "16px", "1rem"] },
            {
              name: "fontWeight",
              values: ["normal", "bold", "400", "600", "700"],
            },
            {
              name: "textAlign",
              values: ["left", "center", "right", "justify"],
            },
            {
              name: "flexDirection",
              values: ["row", "column", "row-reverse", "column-reverse"],
            },
            {
              name: "justifyContent",
              values: [
                "flex-start",
                "center",
                "flex-end",
                "space-between",
                "space-around",
              ],
            },
            {
              name: "alignItems",
              values: [
                "stretch",
                "flex-start",
                "center",
                "flex-end",
                "baseline",
              ],
            },
            { name: "opacity", values: ["0", "0.5", "1"] },
            { name: "zIndex", values: ["0", "1", "10", "100", "999"] },
          ];

          const suggestions = cssProperties.map((prop) => ({
            label: prop.name,
            kind: monaco.languages.CompletionItemKind.Property,
            insertText: `${prop.name}: '\${1|${prop.values.join(",")}|}'`,
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: `CSS property: ${prop.name}`,
            range: range,
          }));

          return { suggestions };
        }

        return { suggestions: [] };
      },
    });
  }

  /**
   * 初始化所有配置
   */
  static initializeAll(monaco: IMonacoInstance) {
    this.setupTypeScriptDefaults(monaco);
    this.addReactTypes(monaco);
    this.registerSnippetProvider(monaco);
    this.setupLanguageConfiguration(monaco);
    this.registerHtmlCompletionProvider(monaco);
    this.registerCssCompletionProvider(monaco);
  }
}
