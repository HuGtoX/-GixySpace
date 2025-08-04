'use client';

import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import {
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
  UndoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface ImageViewerItem {
  id: string;
  src: string;
  alt?: string;
  title?: string;
}

interface ImageViewerProps {
  visible: boolean;
  images: ImageViewerItem[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  showThumbnails?: boolean;
  showDots?: boolean;
  showNavigation?: boolean;
  showZoom?: boolean;
  className?: string;
}

const ImageViewer = ({
  visible,
  images,
  currentIndex,
  onClose,
  onIndexChange,
  showThumbnails = true,
  showDots = true,
  showNavigation = true,
  showZoom = true,
  className,
}: ImageViewerProps) => {
  const { isMobile } = useDeviceDetect();
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // 同步外部索引变化
  useEffect(() => {
    setInternalIndex(currentIndex);
  }, [currentIndex]);

  // 重置缩放和位置
  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // 切换图片时重置变换
  useEffect(() => {
    resetTransform();
  }, [internalIndex, resetTransform]);

  // 处理索引变化
  const handleIndexChange = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < images.length) {
        setInternalIndex(newIndex);
        onIndexChange?.(newIndex);
      }
    },
    [images.length, onIndexChange],
  );

  // 上一张
  const handlePrev = useCallback(() => {
    const newIndex = internalIndex > 0 ? internalIndex - 1 : images.length - 1;
    handleIndexChange(newIndex);
  }, [internalIndex, images.length, handleIndexChange]);

  // 下一张
  const handleNext = useCallback(() => {
    const newIndex = internalIndex < images.length - 1 ? internalIndex + 1 : 0;
    handleIndexChange(newIndex);
  }, [internalIndex, images.length, handleIndexChange]);

  // 缩放
  const handleZoom = useCallback((delta: number) => {
    setScale((prev) => {
      const newScale = Math.max(0.5, Math.min(3, prev + delta));
      return newScale;
    });
  }, []);

  // 鼠标和触摸拖拽
  const handleDragStart = useCallback(
    (clientX: number, clientY: number) => {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({ x: clientX - position.x, y: clientY - position.y });
      }
    },
    [scale, position],
  );

  const handleDragMove = useCallback(
    (clientX: number, clientY: number) => {
      if (isDragging && scale > 1) {
        setPosition({
          x: clientX - dragStart.x,
          y: clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart, scale],
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 鼠标事件处理
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleDragStart(e.clientX, e.clientY);
    },
    [handleDragStart],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove],
  );

  const handleMouseUp = useCallback(() => {
    handleDragEnd();
  }, [handleDragEnd]);

  // 触摸事件处理
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  // 计算两个触摸点之间的距离
  const calculateDistance = useCallback(
    (touch1: React.Touch, touch2: React.Touch) => {
      return Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2),
      );
    },
    [],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        // 单指拖动
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
        setTouchDistance(null);
      } else if (e.touches.length === 2) {
        // 双指缩放
        const distance = calculateDistance(e.touches[0], e.touches[1]);
        setTouchDistance(distance);
        setIsDragging(false);
      }
    },
    [handleDragStart, calculateDistance],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault(); // 防止页面滚动
      if (e.touches.length === 1) {
        // 单指拖动
        const touch = e.touches[0];
        handleDragMove(touch.clientX, touch.clientY);
      } else if (e.touches.length === 2 && touchDistance !== null) {
        // 双指缩放
        const newDistance = calculateDistance(e.touches[0], e.touches[1]);
        const deltaScale = (newDistance - touchDistance) / 200;

        if (Math.abs(deltaScale) > 0.01) {
          handleZoom(deltaScale);
          setTouchDistance(newDistance);
        }
      }
    },
    [handleDragMove, touchDistance, calculateDistance, handleZoom],
  );

  const handleTouchEnd = useCallback(() => {
    handleDragEnd();
    setTouchDistance(null);
  }, [handleDragEnd]);

  // 防止页面滚动
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // 键盘事件
  useEffect(() => {
    if (!visible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          handlePrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          handleZoom(0.2);
          break;
        case '-':
          e.preventDefault();
          handleZoom(-0.2);
          break;
        case '0':
          e.preventDefault();
          resetTransform();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, handlePrev, handleNext, onClose, handleZoom, resetTransform]);

  // 当前图片
  const currentImage = useMemo(() => {
    return images[internalIndex];
  }, [images, internalIndex]);

  if (!visible || !currentImage) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-95 backdrop-blur-sm overflow-hidden ${
        className || ''
      }`}
      style={{ display: visible ? 'flex' : 'none' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex flex-col w-full h-full text-white relative overflow-hidden">
        {/* 顶部工具栏 */}
        <div className="flex justify-between items-center px-4 md:px-6 py-3 md:py-4 bg-black bg-opacity-80 backdrop-blur-md border-b border-white border-opacity-10">
          <div className="flex items-center gap-2 md:gap-4 flex-1">
            <span className="text-xs md:text-sm text-white text-opacity-80 font-medium">
              {internalIndex + 1} / {images.length}
            </span>
            {currentImage.title && (
              <span className="text-sm md:text-base text-white font-medium max-w-24 md:max-w-xs truncate">
                {currentImage.title}
              </span>
            )}
          </div>

          <Space className="flex items-center gap-1 md:gap-2">
            {showZoom && !isMobile && (
              <>
                <Tooltip title="放大">
                  <Button
                    type="text"
                    icon={<ZoomInOutlined />}
                    onClick={() => handleZoom(0.2)}
                    className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md transition-all duration-200"
                  />
                </Tooltip>
                <Tooltip title="缩小">
                  <Button
                    type="text"
                    icon={<ZoomOutOutlined />}
                    onClick={() => handleZoom(-0.2)}
                    className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md transition-all duration-200"
                  />
                </Tooltip>
                <Tooltip title="重置">
                  <Button
                    type="text"
                    icon={<UndoOutlined />}
                    onClick={resetTransform}
                    className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md transition-all duration-200"
                  />
                </Tooltip>
                <span className="text-xs md:text-sm text-white text-opacity-80 min-w-10 md:min-w-12 text-center">
                  {Math.round(scale * 100)}%
                </span>
              </>
            )}

            <Tooltip title="关闭">
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-10 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-md transition-all duration-200"
                title="关闭预览"
              />
            </Tooltip>
          </Space>
        </div>

        {/* 主图片区域 */}
        <div
          className={`flex-1 flex items-center justify-center relative overflow-hidden p-5 md:p-8 ${
            isMobile && showThumbnails && images.length > 1 ? 'pb-24' : ''
          }`}
        >
          {/* 左右导航按钮 */}
          {showNavigation && images.length > 1 && (
            <>
              <Button
                type="text"
                icon={<LeftOutlined />}
                onClick={handlePrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black bg-opacity-60 border border-white border-opacity-20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-80 hover:border-opacity-40 hover:scale-110 active:scale-95 z-10"
              />
              <Button
                type="text"
                icon={<RightOutlined />}
                onClick={handleNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black bg-opacity-60 border border-white border-opacity-20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-opacity-80 hover:border-opacity-40 hover:scale-110 active:scale-95 z-10"
              />
            </>
          )}

          {/* 主图片 */}
          <div
            className="flex items-center justify-center w-full h-full relative select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor:
                scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt || currentImage.title || ''}
              width={800}
              height={600}
              className="max-w-full max-h-full object-contain select-none pointer-events-none"
              style={{
                transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s ease',
              }}
              onDragStart={(e) => e.preventDefault()}
              unoptimized
            />
          </div>
        </div>

        {/* 小点导航 */}
        {showDots && images.length > 1 && !isMobile && (
          <div className="flex justify-center items-center py-4 px-4 gap-3 bg-black bg-opacity-30 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
                  index === internalIndex
                    ? 'bg-orange-500 scale-125 shadow-lg shadow-orange-500/50'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-70 hover:scale-110'
                }`}
                onClick={() => handleIndexChange(index)}
                title={`跳转到第${index + 1}张图片`}
              />
            ))}
          </div>
        )}

        {/* 缩略图列表 */}
        {showThumbnails && images.length > 1 && (
          <div
            className={`py-3 md:py-4 px-4 md:px-6 bg-black bg-opacity-80 backdrop-blur-md border-t border-white border-opacity-10 max-h-20 md:max-h-32 overflow-hidden ${
              isMobile ? 'fixed bottom-0 left-0 right-0 z-20 pb-safe' : ''
            }`}
          >
            <div className="flex justify-center items-center gap-2 md:gap-4 overflow-x-auto py-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/30 hover:scrollbar-thumb-white/50">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`flex-shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-md md:rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 bg-white bg-opacity-10 ${
                    index === internalIndex
                      ? 'border-orange-500 shadow-lg shadow-orange-500/40 scale-110'
                      : 'border-transparent hover:border-white hover:border-opacity-40 hover:scale-105'
                  }`}
                  onClick={() => handleIndexChange(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt || image.title || ''}
                    width={80}
                    height={60}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;