// 图标信息类型
export interface IconInfo {
	url: string;
	size: string;
	format: string;
}

// 图标搜索函数返回类型
export type GetFaviconUrlResult = IconInfo | null;
