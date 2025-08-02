import {
  ConversionSettings,
  ImageFormat,
} from "@/app/(tools)/image/transform/types";

// 支持的图片格式
export const SUPPORTED_FORMATS: ImageFormat[] = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "svg",
];

// 获取MIME类型
export const getMimeType = (format: ImageFormat): string => {
  const mimeTypes: Record<ImageFormat, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return mimeTypes[format];
};

// 检测图片格式
export const detectImageFormat = (file: File): ImageFormat => {
  const extension = file.name.split(".").pop()?.toLowerCase();
  if (extension && SUPPORTED_FORMATS.includes(extension as ImageFormat)) {
    return extension as ImageFormat;
  }
  // 根据MIME类型检测
  if (file.type.includes("jpeg")) return "jpg";
  if (file.type.includes("png")) return "png";
  if (file.type.includes("webp")) return "webp";
  if (file.type.includes("svg")) return "svg";
  return "jpg"; // 默认格式
};

// 创建图片预览URL
export const createPreviewUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 格式转换函数
export const convertImage = async (
  file: File,
  settings: ConversionSettings,
): Promise<{
  blob: Blob;
  preview: string;
  format: ImageFormat;
  size: number;
}> => {
  return new Promise((resolve, reject) => {
    try {
      const { format, quality, removeBackground } = settings;

      // 创建一个canvas元素进行图像处理
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("无法创建Canvas上下文");
      }

      img.onload = async () => {
        // 设置canvas尺寸
        canvas.width = img.width;
        canvas.height = img.height;

        // 绘制图像
        ctx.drawImage(img, 0, 0);

        // 处理背景移除（仅对PNG格式）
        if (removeBackground && format === "png") {
          // 这里简单示范背景移除的逻辑
          // 实际项目可能需要更复杂的算法或库
          // 这里只是简单地将白色背景变为透明
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            // 如果像素接近白色，设置为透明
            if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) {
              data[i + 3] = 0; // 设置透明度为0
            }
          }

          ctx.putImageData(imageData, 0, 0);
        }

        // 转换为目标格式
        const mimeType = getMimeType(format);

        // 对于JPEG和WEBP格式，可以设置质量
        let blob: Blob;
        if (format === "jpg" || format === "jpeg" || format === "webp") {
          blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), mimeType, quality / 100),
          );
        } else {
          blob = await new Promise<Blob>((resolve) =>
            canvas.toBlob((b) => resolve(b!), mimeType),
          );
        }

        // 创建预览URL
        const preview = URL.createObjectURL(blob);

        resolve({
          blob,
          preview,
          format,
          size: blob.size,
        });
      };

      img.onerror = () => {
        reject(new Error("图像加载失败"));
      };

      // 创建预览URL
      createPreviewUrl(file)
        .then((previewUrl) => {
          img.src = previewUrl;
        })
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

// 获取推荐格式
export const getRecommendedFormat = (
  currentFormat: ImageFormat,
): ImageFormat => {
  // 根据当前格式推荐最佳转换格式
  const recommendations: Record<ImageFormat, ImageFormat> = {
    jpg: "webp",
    jpeg: "webp",
    png: "webp",
    webp: "png",
    svg: "png",
  };
  return recommendations[currentFormat] || "webp";
};

// 保存图片
export const saveImage = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// 检查文件大小限制
export const checkFileSizeLimit = (file: File, isMobile: boolean): boolean => {
  const maxSize = isMobile ? 20 * 1024 * 1024 : 50 * 1024 * 1024; // 20MB for mobile, 50MB for desktop
  return file.size <= maxSize;
};

// 格式化文件大小
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
