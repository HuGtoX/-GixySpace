import React, { useState, useCallback } from "react";
import { Upload, message, Typography, Alert } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import {
  checkFileSizeLimit,
  createPreviewUrl,
  detectImageFormat,
} from "@/utils/imageProcessing";

const { Dragger } = Upload;
const { Text } = Typography;

interface FileUploaderProps {
  onFilesAdded: (files: any[]) => void;
  accept?: string; // 允许的文件类型，默认image/*
  maxSizeMobile?: number; // 移动端最大文件大小（MB），默认20
  maxSizeDesktop?: number; // 桌面端最大文件大小（MB），默认50
  uploadText?: string; // 上传提示文本
  disabled?: boolean; // 是否禁用上传
  fileTypeValidator?: (file: File) => boolean; // 自定义文件类型验证函数（默认检查是否为图片）
  errorMessages?: {
    invalidType?: string; // 文件类型错误提示
    overSize?: string; // 文件大小超限提示
    maxFiles?: string; // 超过最大文件数提示
    filterRejected?: string; // 文件过滤拒绝提示
  }; // 自定义错误提示
  draggerStyle?: React.CSSProperties; // 自定义拖放区域样式
  maxFiles?: number; // 最大允许上传文件数（默认无限制）
  beforeUpload?: (files: File[]) => Promise<boolean>; // 上传前钩子（返回false则取消上传）
  uploadButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // 上传按钮额外属性
  multiple?: boolean; // 是否允许多文件上传（默认true）
  fileFilter?: (file: File) => boolean; // 自定义文件过滤函数（默认不过滤）
  onUploadSuccess?: (files: any[]) => void; // 上传成功回调
  onUploadError?: (error: string) => void; // 上传失败回调
  loadingText?: string; // 加载状态提示文本（默认"正在处理..."）
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesAdded,
  accept = "image/*",
  maxSizeMobile = 20,
  maxSizeDesktop = 50,
  uploadText,
  disabled = false,
  fileTypeValidator,
  errorMessages,
  draggerStyle,
  maxFiles,
  beforeUpload,
  uploadButtonProps,
  multiple = true,
  fileFilter,
  onUploadSuccess,
  onUploadError,
  loadingText = "正在处理...",
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobile } = useDeviceDetect();

  // 处理文件函数
  const processFiles = useCallback(
    async (fileList: File[]) => {
      if (isLoading) {
        return;
      }
      if (fileList.length === 0) {
        return;
      }
      if (maxFiles && fileList.length > maxFiles) {
        const errorMsg =
          errorMessages?.maxFiles || `最多只能上传${maxFiles}个文件`;
        onUploadError?.(errorMsg);
        message.error(errorMsg);
        return;
      }
      if (beforeUpload) {
        const canUpload = await beforeUpload(fileList);
        if (!canUpload) return;
      }

      try {
        setIsLoading(true);

        const currentMaxSize = isMobile ? maxSizeMobile : maxSizeDesktop;
        const validFiles: any[] = [];
        const invalidFiles: string[] = [];

        for (const file of fileList) {
          // 验证文件类型
          const isValidType = fileTypeValidator
            ? fileTypeValidator(file)
            : file.type.startsWith("image/");
          if (!isValidType) {
            invalidFiles.push(
              `${file.name} (${errorMessages?.invalidType || "文件类型不支持"})`,
            );
            continue;
          }

          // 验证文件大小
          if (!checkFileSizeLimit(file, true)) {
            invalidFiles.push(
              `${file.name} (${errorMessages?.overSize || `超过${currentMaxSize}MB限制`})`,
            );
            continue;
          }

          // 处理有效文件
          try {
            if (fileFilter && !fileFilter(file)) {
              invalidFiles.push(
                `${file.name} (${errorMessages?.filterRejected || "文件未通过过滤"})`,
              );
              continue;
            }
            const preview = await createPreviewUrl(file);
            const format = detectImageFormat(file);

            validFiles.push({
              id: uuidv4(),
              file,
              preview,
              format,
              size: file.size,
              name: file.name,
              status: "idle",
            });
          } catch (error) {
            invalidFiles.push(`${file.name} (处理失败)`);
          }
        }

        // 提示无效文件
        if (invalidFiles.length > 0) {
          message.error(
            `${invalidFiles.length}个文件无法处理: ${invalidFiles.join(", ")}`,
          );
          onUploadError?.(`${invalidFiles.length}个文件无法处理`);
        }

        // 返回有效文件
        if (validFiles.length > 0) {
          onFilesAdded(validFiles);
          message.success(`已添加${validFiles.length}个文件`);
          onUploadSuccess?.(validFiles);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [
      isMobile,
      onFilesAdded,
      isLoading,
      maxFiles,
      errorMessages,
      beforeUpload,
      fileTypeValidator,
      fileFilter,
      onUploadSuccess,
      onUploadError,
    ],
  );

  // 处理文件选择
  const handleFileUpload = useCallback(
    (options: any) => {
      const { file, onSuccess } = options;

      // 单个文件上传处理
      if (file instanceof File) {
        processFiles([file]);
      }

      // 完成上传操作
      if (onSuccess) {
        onSuccess("ok");
      }
    },
    [processFiles],
  );

  // 处理拖放上传
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const fileArray = Array.from(e.dataTransfer.files);
        processFiles(fileArray);
      }
    },
    [processFiles],
  );

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragLeave={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
        style={{ ...draggerStyle, position: "relative" }}
      >
        <Dragger
          name="file"
          multiple={multiple}
          accept={accept}
          showUploadList={false}
          customRequest={handleFileUpload}
          fileList={[]}
          disabled={disabled || isLoading}
          style={{
            padding: isMobile ? "20px" : "40px",
            borderRadius: "8px",
            transition: "all 0.3s",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined
              className="text-primary dark:text-primary"
              style={{
                fontSize: isMobile ? "48px" : "64px",
              }}
            />
          </p>
          <Typography.Title level={isMobile ? 5 : 4}>
            {isLoading
              ? loadingText
              : uploadText ||
                (isMobile ? "点击上传" : "拖放文件到这里，或点击上传")}
          </Typography.Title>
          <button
            {...uploadButtonProps}
            className="mt-4 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full"
          >
            选择文件
          </button>
          <Text type="secondary">支持JPG、PNG、WEBP、GIF、SVG格式图片</Text>
          <br />
          <Text type="secondary">
            单个文件大小限制：{isMobile ? "20MB" : "50MB"}
          </Text>
        </Dragger>
      </div>

      <Alert
        message="提示"
        description={`您正在使用${isMobile ? "移动" : "桌面"}设备模式，单个文件大小限制为${isMobile ? maxSizeMobile : maxSizeDesktop}MB。`}
        type="info"
        showIcon
        style={{ marginTop: "16px" }}
      />
    </div>
  );
};

export default FileUploader;
