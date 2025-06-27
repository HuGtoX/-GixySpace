import { ImageViewer, ImageViewerItem } from "@/components/ImageViewer";
import {
  convertImage,
  getRecommendedFormat,
  saveImage,
} from "@/utils/imageProcessing";
import { Button, Col, Empty, message, Modal, notification, Row } from "antd";
import { useCallback, useState } from "react";
import BatchActions from "./components/BatchActions";
import ConversionSettings from "./components/ConversionSettings";
import FileUploader from "./components/FileUploader";
import ImageItem from "./components/ImageItem";
import { ImageFile, ConversionSettings as SettingsType } from "./type";

// 检查浏览器是否支持Web Share API
const isShareSupported =
  typeof navigator !== "undefined" && "share" in navigator;

function App() {
  // 状态管理
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [settings, setSettings] = useState<SettingsType>({
    format: "webp",
    quality: 80,
    removeBackground: false,
    preserveExif: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  // 图片预览状态
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  // 处理新添加的文件
  const handleFilesAdded = useCallback(
    (files: ImageFile[]) => {
      // 检查文件ID是否已存在，防止重复添加
      setImageFiles((prevFiles) => {
        // 获取已有文件的ID集合
        const existingIds = new Set(prevFiles.map((file) => file.id));

        // 过滤掉已存在的文件
        const newFiles = files.filter((file) => !existingIds.has(file.id));

        // 如果没有新文件，直接返回原状态
        if (newFiles.length === 0) {
          return prevFiles;
        }

        // 否则添加新文件
        return [...prevFiles, ...newFiles];
      });

      // 如果只有一个文件，自动推荐最佳格式
      if (files.length === 1) {
        const recommendedFormat = getRecommendedFormat(files[0].format);
        if (recommendedFormat !== settings.format) {
          setSettings((prev) => ({ ...prev, format: recommendedFormat }));
        }
      }
    },
    [settings.format],
  );

  // 处理单个文件转换
  const handleConvertSingle = useCallback(
    (id: string) => {
      console.log(`handleConvertSingle 被调用，文件ID: ${id}`);
      const fileToConvert = imageFiles.find((file) => file.id === id);
      if (!fileToConvert) {
        console.log(`未找到ID为 ${id} 的文件`);
        return;
      }

      // 立即执行一个函数确保不会被React的异步行为影响
      (async function executeSingleConversion() {
        console.log(`开始转换文件: ${fileToConvert.name}`);

        try {
          // 先设置状态
          console.log("设置isProcessing为true");
          setIsProcessing(true);

          // 使用一个小延迟确保状态更新
          await new Promise((resolve) => setTimeout(resolve, 100));

          // 更新状态为处理中
          setImageFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === id ? { ...f, status: "processing" } : f,
            ),
          );

          // 使用一个小延迟确保状态更新
          await new Promise((resolve) => setTimeout(resolve, 50));

          // 执行转换
          const result = await convertImage(fileToConvert, settings);
          console.log(`文件 ${fileToConvert.name} 转换完成`);

          // 更新为已完成状态
          setImageFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === id
                ? {
                    ...f,
                    status: "completed",
                    result: {
                      preview: result.preview,
                      blob: result.blob,
                      format: result.format,
                      size: result.size,
                    },
                  }
                : f,
            ),
          );

          message.success(`已转换 ${fileToConvert.name}`);
        } catch (error) {
          console.error(`文件 ${fileToConvert.name} 转换失败:`, error);
          setImageFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === id
                ? {
                    ...f,
                    status: "error",
                    error: error instanceof Error ? error.message : "未知错误",
                  }
                : f,
            ),
          );
          message.error(
            `转换失败: ${error instanceof Error ? error.message : "未知错误"}`,
          );
        } finally {
          console.log("设置isProcessing为false");
          setIsProcessing(false);
        }
      })();

      // 函数立即返回，不等待异步操作完成
      console.log("handleConvertSingle函数同步部分执行完毕");
    },
    [imageFiles, settings],
  );

  // 处理转换剩余文件
  const handleConvertRemaining = useCallback(() => {
    console.log("handleConvertRemaining 被调用");
    const pendingFiles = imageFiles.filter(
      (file) => file.status === "idle" || file.status === "error",
    );

    if (pendingFiles.length === 0) {
      message.info("没有需要转换的文件");
      return;
    }

    // 立即执行一个函数确保不会被React的异步行为影响
    (async function executeRemainingConversion() {
      console.log("开始处理剩余图片，总数:", pendingFiles.length);

      try {
        // 先设置状态
        console.log("设置isProcessing为true");
        setIsProcessing(true);
        setProgress(0);

        // 使用一个小延迟确保状态更新
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 创建待处理文件的副本
        const files = [...pendingFiles];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(`处理第 ${i + 1}/${files.length} 个剩余文件:`, file.name);

          // 更新状态为处理中
          setImageFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id ? { ...f, status: "processing" } : f,
            ),
          );

          // 使用一个小延迟确保状态更新
          await new Promise((resolve) => setTimeout(resolve, 50));

          try {
            // 进行转换
            const result = await convertImage(file, settings);
            console.log(`文件 ${file.name} 转换完成`);

            // 更新状态为已完成
            setImageFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === file.id
                  ? {
                      ...f,
                      status: "completed",
                      result: {
                        preview: result.preview,
                        blob: result.blob,
                        format: result.format,
                        size: result.size,
                      },
                    }
                  : f,
              ),
            );
          } catch (error) {
            console.error(`文件 ${file.name} 转换失败:`, error);
            setImageFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === file.id
                  ? {
                      ...f,
                      status: "error",
                      error:
                        error instanceof Error ? error.message : "未知错误",
                    }
                  : f,
              ),
            );
          }

          // 更新进度
          setProgress(Math.round(((i + 1) / files.length) * 100));
        }

        console.log("所有剩余图片处理完成");
        notification.success({
          message: "转换完成",
          description: "已完成剩余文件的转换",
          placement: "bottomRight",
        });
      } catch (error) {
        console.error("处理剩余图片过程中发生错误:", error);
        message.error("转换过程中出错");
      } finally {
        console.log("设置isProcessing为false");
        setIsProcessing(false);
      }
    })();

    // 函数立即返回，不等待异步操作完成
    console.log("handleConvertRemaining函数同步部分执行完毕");
  }, [imageFiles, settings]);

  // 实际执行转换所有图片的函数 - 使用同步方式启动
  const doConvertAllFiles = useCallback(() => {
    // 立即执行一个函数确保不会被React的异步行为影响
    (async function executeConversion() {
      console.log("开始执行全部图片转换");
      if (imageFiles.length === 0) {
        message.info("没有需要转换的文件");
        return;
      }

      try {
        // 先设置状态
        console.log("设置isProcessing为true");
        setIsProcessing(true);
        setProgress(0);

        // 使用一个小延迟确保状态更新
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 处理所有文件
        const files = [...imageFiles]; // 创建副本避免在循环中数组变化
        console.log(`准备处理 ${files.length} 个文件`);

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(`处理第 ${i + 1}/${files.length} 个文件: ${file.name}`);

          // 更新状态为处理中
          setImageFiles((prevFiles) =>
            prevFiles.map((f) =>
              f.id === file.id ? { ...f, status: "processing" } : f,
            ),
          );

          // 使用一个小延迟确保状态更新
          await new Promise((resolve) => setTimeout(resolve, 50));

          try {
            // 进行转换
            const result = await convertImage(file, settings);
            console.log(`文件 ${file.name} 转换完成`);

            // 更新状态为已完成
            setImageFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === file.id
                  ? {
                      ...f,
                      status: "completed",
                      result: {
                        preview: result.preview,
                        blob: result.blob,
                        format: result.format,
                        size: result.size,
                      },
                    }
                  : f,
              ),
            );
          } catch (error) {
            console.error(`文件 ${file.name} 转换失败:`, error);
            setImageFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.id === file.id
                  ? {
                      ...f,
                      status: "error",
                      error:
                        error instanceof Error ? error.message : "未知错误",
                    }
                  : f,
              ),
            );
          }

          // 更新进度
          setProgress(Math.round(((i + 1) / files.length) * 100));
        }

        console.log("所有图片处理完成");
        notification.success({
          message: "转换完成",
          description: "已完成所有图片的转换",
          placement: "bottomRight",
        });
      } catch (error) {
        console.error("处理图片过程中发生错误:", error);
        message.error("转换过程中出错");
      } finally {
        console.log("设置isProcessing为false");
        setIsProcessing(false);
      }
    })();

    // 函数立即返回，不等待异步操作完成
    console.log("doConvertAllFiles函数同步部分执行完毕");
  }, [imageFiles, settings]);

  // 状态：是否显示确认对话框
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 处理全部转换的点击事件 - 改为完全同步方式
  const handleConvertAll = useCallback(() => {
    console.log("handleConvertAll 被调用");

    // 如果没有任何图片，直接返回
    if (imageFiles.length === 0) {
      message.info("没有需要转换的文件");
      return;
    }

    // 检查是否有已经转换过的图片
    const completedFiles = imageFiles.filter(
      (file) => file.status === "completed",
    );
    const hasCompletedFiles = completedFiles.length > 0;

    if (hasCompletedFiles) {
      // 显示自定义确认对话框
      console.log("发现已转换图片，设置showConfirmModal为true");
      setShowConfirmModal(true);
    } else {
      // 如果没有已转换的图片，直接转换
      console.log("没有已转换图片，直接开始转换");
      doConvertAllFiles();
    }
  }, [imageFiles, doConvertAllFiles]);

  // 处理确认对话框的确认按钮点击
  const handleConfirmConvert = useCallback(() => {
    console.log("用户点击了确认按钮");
    setShowConfirmModal(false);
    // 执行转换
    doConvertAllFiles();
  }, [doConvertAllFiles]);

  // 处理确认对话框的取消按钮点击
  const handleCancelConvert = useCallback(() => {
    console.log("用户点击了取消按钮");
    setShowConfirmModal(false);
  }, []);

  // 处理下载
  const handleDownload = useCallback((file: ImageFile) => {
    if (file.result?.blob) {
      saveImage(file.result.blob, file.name, file.result.format);
    }
  }, []);

  // 处理全部下载
  const handleDownloadAll = useCallback(() => {
    const completedFiles = imageFiles.filter(
      (file) => file.status === "completed" && file.result?.blob,
    );

    if (completedFiles.length === 0) {
      message.info("没有可下载的文件");
      return;
    }

    completedFiles.forEach((file) => {
      if (file.result?.blob) {
        saveImage(file.result.blob, file.name, file.result.format);
      }
    });

    message.success(`下载了 ${completedFiles.length} 个文件`);
  }, [imageFiles]);

  // 处理删除
  const handleDelete = useCallback((id: string) => {
    setImageFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  }, []);

  // 处理清空
  const handleClearAll = useCallback(() => {
    setImageFiles([]);
    message.info("已清空所有文件");
  }, []);

  // 分享文件（移动端）
  const handleShare = useCallback(async (imageFile: ImageFile) => {
    if (!imageFile.result?.blob || !isShareSupported) {
      message.error("您的浏览器不支持分享功能");
      return;
    }

    try {
      const fileName = `${imageFile.name.split(".")[0]}.${imageFile.result.format}`;
      const file = new File([imageFile.result.blob], fileName, {
        type: imageFile.result.blob.type,
      });

      await navigator.share({
        title: "分享图片",
        text: "我使用图像处理工具处理的图片",
        files: [file],
      });

      message.success("分享成功");
    } catch (error) {
      message.error("分享失败");
      console.error(error);
    }
  }, []);

  // 处理图片预览
  const handlePreview = useCallback(
    (imageFile: ImageFile) => {
      const index = imageFiles.findIndex((file) => file.id === imageFile.id);
      if (index !== -1) {
        setPreviewIndex(index);
        setPreviewVisible(true);
      }
    },
    [imageFiles],
  );

  // 关闭预览
  const handleClosePreview = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  // 预览索引变化
  const handlePreviewIndexChange = useCallback((index: number) => {
    setPreviewIndex(index);
  }, []);

  // 转换图片数据为预览格式
  const previewImages: ImageViewerItem[] = imageFiles.map((file) => ({
    id: file.id,
    src: file.result?.preview || file.preview,
    alt: file.name,
    title: `${file.name} (${file.format.toUpperCase()}${file.result ? ` → ${file.result.format.toUpperCase()}` : ""})`,
  }));

  return (
    <>
      {/* 自定义确认对话框 */}
      <Modal
        title="确认重新转换"
        open={showConfirmModal}
        onCancel={handleCancelConvert}
        footer={[
          <Button key="cancel" onClick={handleCancelConvert}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleConfirmConvert}>
            继续转换
          </Button>,
        ]}
      >
        <p>检测到有已转换的图片，重新转换可能会覆盖之前的结果。是否继续？</p>
      </Modal>
      <Row gutter={[24, 24]}>
        {/* 左侧内容 - 上传区 */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <FileUploader onFilesAdded={handleFilesAdded} />
        </Col>

        {/* 右侧内容 - 设置区 */}
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <ConversionSettings
            settings={settings}
            onSettingsChange={setSettings}
            currentFormat={
              imageFiles.length === 1 ? imageFiles[0].format : undefined
            }
          />
        </Col>
      </Row>

      {/* 批量操作区 */}
      {imageFiles.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <BatchActions
            imageFiles={imageFiles}
            onConvertAll={handleConvertAll}
            onConvertRemaining={handleConvertRemaining}
            onDownloadAll={handleDownloadAll}
            onClearAll={handleClearAll}
            isProcessing={isProcessing}
            progress={progress}
          />
        </div>
      )}

      {/* 图片预览区 */}
      <div style={{ marginTop: "24px" }}>
        {imageFiles.length > 0 ? (
          imageFiles.map((file) => (
            <ImageItem
              key={file.id}
              imageFile={file}
              onDownload={handleDownload}
              onShare={isShareSupported ? handleShare : undefined}
              onDelete={handleDelete}
              onConvert={handleConvertSingle}
              onPreview={handlePreview}
            />
          ))
        ) : (
          <Empty
            description="请上传图片文件"
            style={{ marginTop: "32px", padding: "32px" }}
          />
        )}
      </div>

      {/* 图片预览器 */}
      <ImageViewer
        visible={previewVisible}
        images={previewImages}
        currentIndex={previewIndex}
        onClose={handleClosePreview}
        onIndexChange={handlePreviewIndexChange}
        showThumbnails={true}
        showDots={true}
        showNavigation={true}
        showZoom={true}
      />
    </>
  );
}

export default App;
