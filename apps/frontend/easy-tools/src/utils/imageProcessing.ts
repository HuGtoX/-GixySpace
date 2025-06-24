import {
	ImageFormat,
	ImageFile,
	ConversionSettings
} from '@/pages/image/transform/type';
import { saveAs } from 'file-saver';

// 获取文件MIME类型
export const getMimeType = (format: ImageFormat): string => {
	switch (format) {
		case 'jpg':
		case 'jpeg':
			return 'image/jpeg';
		case 'png':
			return 'image/png';
		case 'webp':
			return 'image/webp';
		case 'gif':
			return 'image/gif';
		case 'svg':
			return 'image/svg+xml';
		default:
			return 'image/jpeg';
	}
};

// 检测文件格式
export const detectImageFormat = (file: File): ImageFormat => {
	const extension = file.name.split('.').pop()?.toLowerCase() as ImageFormat;
	if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(extension)) {
		return extension;
	}
	return 'jpeg'; // 默认格式
};

// 创建图片预览URL
export const createPreviewUrl = async (file: File): Promise<string> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			resolve(reader.result as string);
		};
		reader.readAsDataURL(file);
	});
};

// 格式转换函数
export const convertImage = async (
	imageFile: ImageFile,
	settings: ConversionSettings
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
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				throw new Error('无法创建Canvas上下文');
			}

			img.onload = async () => {
				// 设置canvas尺寸
				canvas.width = img.width;
				canvas.height = img.height;

				// 绘制图像
				ctx.drawImage(img, 0, 0);

				// 处理背景移除（仅对PNG格式）
				if (removeBackground && format === 'png') {
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
				if (format === 'jpg' || format === 'jpeg' || format === 'webp') {
					blob = await new Promise<Blob>((resolve) =>
						canvas.toBlob((b) => resolve(b!), mimeType, quality / 100)
					);
				} else {
					blob = await new Promise<Blob>((resolve) =>
						canvas.toBlob((b) => resolve(b!), mimeType)
					);
				}

				// 创建预览URL
				const preview = URL.createObjectURL(blob);

				resolve({
					blob,
					preview,
					format,
					size: blob.size
				});
			};

			img.onerror = () => {
				reject(new Error('图像加载失败'));
			};

			img.src = imageFile.preview;
		} catch (error) {
			reject(error);
		}
	});
};

// 保存处理后的图像
export const saveImage = (
	blob: Blob,
	fileName: string,
	format: ImageFormat
): void => {
	const name = fileName.split('.')[0];
	saveAs(blob, `${name}.${format}`);
};

// 获取推荐的目标格式
export const getRecommendedFormat = (
	currentFormat: ImageFormat
): ImageFormat => {
	switch (currentFormat) {
		case 'jpg':
		case 'jpeg':
			return 'webp'; // JPEG→WEBP通常能减小文件大小
		case 'png':
			return 'webp'; // PNG→WEBP通常能减小文件大小并保持透明度
		case 'gif':
			return 'gif'; // GIF保持原格式
		case 'svg':
			return 'svg'; // SVG保持原格式
		default:
			return 'webp';
	}
};

// 文件大小格式化
export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return '0 B';

	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 检查文件大小是否在限制范围内
export const checkFileSizeLimit = (file: File, maxSize: number): boolean => {
  return file.size <= maxSize * 1024 * 1024; // maxSize以MB为单位
};
