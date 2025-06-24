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
import { ImageFile } from "../type";

const { Dragger } = Upload;
const { Text } = Typography;

interface FileUploaderProps {
  onFilesAdded: (files: ImageFile[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesAdded }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isMobile } = useDeviceDetect();

  // 处理文件函数
  const processFiles = useCallback(
    async (fileList: File[]) => {
      if (isLoading || fileList.length === 0) {
        return;
      }

      try {
        setIsLoading(true);

        const maxSize = isMobile ? 20 : 50; // 以MB为单位
        const validFiles: ImageFile[] = [];
        const invalidFiles: string[] = [];

        for (const file of fileList) {
          // 验证文件类型
          const isImage = file.type.startsWith("image/");
          if (!isImage) {
            invalidFiles.push(`${file.name} (不是图片文件)`);
            continue;
          }

          // 验证文件大小
          if (!checkFileSizeLimit(file, isMobile)) {
            invalidFiles.push(`${file.name} (超过${maxSize}MB限制)`);
            continue;
          }

          // 处理有效文件
          try {
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
        }

        // 返回有效文件
        if (validFiles.length > 0) {
          onFilesAdded(validFiles);
          message.success(`已添加${validFiles.length}个文件`);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isMobile, onFilesAdded, isLoading],
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
        style={{ position: "relative" }}
      >
        <Dragger
          name="file"
          multiple
          accept="image/*"
          showUploadList={false}
          customRequest={handleFileUpload}
          fileList={[]}
          disabled={isLoading}
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
              ? "正在处理..."
              : isMobile
                ? "点击上传"
                : "拖放文件到这里，或点击上传"}
          </Typography.Title>
          <Text type="secondary">支持JPG、PNG、WEBP、GIF、SVG格式图片</Text>
          <br />
          <Text type="secondary">
            单个文件大小限制：{isMobile ? "20MB" : "50MB"}
          </Text>
        </Dragger>
      </div>

      <Alert
        message="提示"
        description={`您正在使用${isMobile ? "移动" : "桌面"}设备模式，${isMobile ? "单个文件大小限制为20MB" : "单个文件大小限制为50MB"}。`}
        type="info"
        showIcon
        style={{ marginTop: "16px" }}
      />
    </div>
  );
};

export default FileUploader;
