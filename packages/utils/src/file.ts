// 文件下载
export const downloadFile = (url: string, fileName: string) => {
	const a = document.createElement('a');
	a.href = url;
	a.download = fileName;
	a.click();
};

// 格式化字节
export const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes === 0) return '0 Bytes';
	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
