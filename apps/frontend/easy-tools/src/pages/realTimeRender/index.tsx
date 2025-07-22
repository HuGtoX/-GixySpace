import React, { useState, useRef } from "react";
import { useDeviceDetect } from "../../hooks/useDeviceDetect";
import CodeEditor from "./components/CodeEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodeRenderer from "./components/CodeRenderer";
import FullscreenView from "./components/FullscreenView";
import { App } from "antd";

const defaultCode = `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello World!');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#FF6347', marginBottom: '20px' }}>{text}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
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
          onClick={() => setCount(count + 1)}
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
          onClick={() => setCount(0)}
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { message } = App.useApp();

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
    setRenderKey((prev) => prev + 1);
    message.success("正在运行代码...");
  };

  // 刷新预览
  const handleRefresh = () => {
    setRenderKey((prev) => prev + 1);
    message.success("预览已刷新");
  };

  // 全屏切换
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // iframe 加载完成
  const handleIframeLoad = () => {
    // iframe 加载完成后的处理逻辑
  };

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
        />
        <CodeRenderer code={code} iframeRef={iframeRef} renderKey={renderKey} />
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
          onChange={setCode}
          onRun={handleRun}
          onCopy={handleCopyCode}
          onRefresh={handleRefresh}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        {/* 预览区 */}
        <PreviewPanel iframeRef={iframeRef} onIframeLoad={handleIframeLoad} />
      </div>

      {/* 代码渲染器 */}
      <CodeRenderer code={code} iframeRef={iframeRef} renderKey={renderKey} />

      {/* 移动端提示 */}
      {isMobile && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡
            提示：在移动端，代码编辑器在上方，预览区域在下方。你可以滚动查看完整内容。
          </p>
        </div>
      )}
    </div>
  );
};

export default RealTimeRender;
