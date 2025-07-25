import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import CodeEditor from "./components/CodeEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodeRenderer from "./components/CodeRenderer";
import FullscreenView from "./components/FullscreenView";
import ShortcutHelp from "./components/ShortcutHelp";
import { ConsoleLog } from "./components/ConsolePanel";
import { App } from "antd";

// 渲染状态类型
type RenderStatus = "idle" | "compiling" | "rendering" | "completed" | "error";

const defaultCode = `import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello World!');

  // 组件挂载时输出日志
  useEffect(() => {
    console.log('🚀 App组件已挂载');
    console.info('这是一个信息日志');
    console.warn('这是一个警告日志');
    
    return () => {
      console.log('👋 App组件即将卸载');
    };
  }, []);

  // 监听count变化
  useEffect(() => {
    if (count > 0) {
      console.log('📊 计数器更新:', count);
      if (count === 5) {
        console.warn('⚠️ 计数器达到5次了！');
      }
      if (count >= 10) {
        console.error('❌ 计数器超过10次，建议重置！');
      }
    }
  }, [count]);

  const handleIncrement = () => {
    const newCount = count + 1;
    console.log('➕ 点击增加按钮，新值:', newCount);
    setCount(newCount);
  };

  const handleReset = () => {
    console.log('🔄 重置计数器');
    setCount(0);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    console.log('✏️ 文本变更:', { from: text, to: newText });
    setText(newText);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#FF6347', marginBottom: '20px' }}>{text}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={handleTextChange}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginRight: '10px',
            fontSize: '14px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={handleIncrement}
          style={{
            padding: '8px 16px',
            backgroundColor: '#FF6347',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          点击次数: {count}
        </button>
        
        <button 
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          重置
        </button>
      </div>
      
      <div style={{
        padding: '15px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <p><strong>当前计数:</strong> {count}</p>
        <p><strong>当前文本:</strong> {text}</p>
        <p><strong>时间:</strong> {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}

export default App;`;

const RealTimeRender: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  const [code, setCode] = useState(defaultCode);
  const [renderKey, setRenderKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [renderStatus, setRenderStatus] = useState<RenderStatus>("idle");
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { message } = App.useApp();

  // 防抖渲染函数
  const debouncedRender = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setRenderStatus("compiling");
    debounceTimerRef.current = setTimeout(() => {
      setRenderStatus("rendering");
      setRenderKey((prev) => prev + 1);

      // 模拟渲染完成状态
      setTimeout(() => {
        setRenderStatus("completed");
        setTimeout(() => setRenderStatus("idle"), 1000);
      }, 500);
    }, 400);
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // 复制代码
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      message.success("代码已复制到剪贴板");
    } catch (err) {
      message.error("复制失败");
    }
  };

  // 运行/刷新预览
  const handleRun = () => {
    setRenderStatus("compiling");
    setTimeout(() => {
      setRenderStatus("rendering");
      setRenderKey((prev) => prev + 1);
      setTimeout(() => {
        setRenderStatus("completed");
        setTimeout(() => setRenderStatus("idle"), 1000);
      }, 500);
    }, 100);
    message.success("正在运行代码...");
  };

  // 刷新预览
  const handleRefresh = () => {
    setRenderStatus("compiling");
    setTimeout(() => {
      setRenderStatus("rendering");
      setRenderKey((prev) => prev + 1);
      setTimeout(() => {
        setRenderStatus("completed");
        setTimeout(() => setRenderStatus("idle"), 1000);
      }, 500);
    }, 100);
    message.success("预览已刷新");
  };

  // 切换快捷键帮助
  const toggleShortcutHelp = () => {
    setShowShortcutHelp(!showShortcutHelp);
  };

  // 全屏切换
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // iframe 加载完成
  const handleIframeLoad = () => {
    // iframe 加载完成后的处理逻辑
  };

  // 处理console日志
  const handleConsoleLog = useCallback((log: ConsoleLog) => {
    setConsoleLogs((prev) => [...prev, log]);
  }, []);

  // 清空console日志
  const handleClearConsole = useCallback(() => {
    setConsoleLogs([]);
  }, []);

  // 代码变更时清空console日志
  const handleCodeChangeWithClearConsole = useCallback(
    (newCode: string) => {
      setCode(newCode);
      setConsoleLogs([]); // 清空之前的日志
      debouncedRender();
    },
    [debouncedRender],
  );

  if (isFullscreen) {
    return (
      <>
        <FullscreenView
          iframeRef={iframeRef}
          onRun={handleRun}
          onCopy={handleCopyCode}
          onRefresh={handleRefresh}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          consoleLogs={consoleLogs}
          onClearConsole={handleClearConsole}
        />
        <CodeRenderer
          code={code}
          iframeRef={iframeRef}
          renderKey={renderKey}
          onConsoleLog={handleConsoleLog}
        />
      </>
    );
  }

  return (
    <div className="h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          实时代码渲染
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          在左侧编辑 React 代码，右侧实时查看渲染效果。支持 JSX 语法和 React
          Hooks。
        </p>
      </div>

      <div
        className={`h-[calc(100vh-200px)] ${isMobile ? "flex flex-col gap-4" : "grid grid-cols-2 gap-4"}`}
      >
        {/* 代码编辑区 */}
        <CodeEditor
          code={code}
          onChange={handleCodeChangeWithClearConsole}
          onRun={handleRun}
          onCopy={handleCopyCode}
          onRefresh={handleRefresh}
          onToggleFullscreen={toggleFullscreen}
          onToggleShortcutHelp={toggleShortcutHelp}
          isFullscreen={isFullscreen}
          showShortcutHelp={showShortcutHelp}
        />

        {/* 预览区 */}
        <PreviewPanel
          iframeRef={iframeRef}
          onIframeLoad={handleIframeLoad}
          renderStatus={renderStatus}
          consoleLogs={consoleLogs}
          onClearConsole={handleClearConsole}
        />
      </div>

      {/* 代码渲染器 */}
      <CodeRenderer
        code={code}
        iframeRef={iframeRef}
        renderKey={renderKey}
        onConsoleLog={handleConsoleLog}
      />

      {/* 移动端提示 */}
      {isMobile && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡
            提示：在移动端，代码编辑器在上方，预览区域在下方。你可以滚动查看完整内容。
          </p>
        </div>
      )}

      {/* 快捷键帮助 */}
      <ShortcutHelp
        visible={showShortcutHelp}
        onClose={() => setShowShortcutHelp(false)}
      />
    </div>
  );
};

export default RealTimeRender;
