import { JSDOM } from 'jsdom';

/**
 * 获取网站的所有图标信息（包含URL、尺寸和格式）
 * @param request 请求对象
 * @returns 图标信息数组或 null
 */
async function getFaviconUrl(request: Request) {
	try {
		const url = new URL(request.url);
		const params = Object.fromEntries(url.searchParams.entries());
		const targetUrl = params.url || '';

		// 标准化目标URL
		const normalizedUrl = 
			targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
				? targetUrl
				: `https://${targetUrl}`;

		// 记录请求信息用于调试
		console.log(`请求目标: ${normalizedUrl}`);

		const response = await fetch(normalizedUrl);

		if (!response.ok) {
			throw new Error(`无法访问网站: ${response.statusText}`);
		}
		const html = await response.text();
		const dom = new JSDOM(html);
		const document = dom.window.document;

		if (!document) {
			throw new Error('无法解析 HTML 文档');
		}

		// 查找所有可能的图标标签，使用更宽松的选择器
		const iconLinks = document.querySelectorAll(
			'link[rel*="icon" i], link[rel*="ICON" i], link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]'
		);
		const icons: Array<{ url: string; size: string; format: string }> = [];

		console.log(`找到 ${iconLinks.length} 个图标标签`);

		iconLinks.forEach((link) => {
			const href = link.getAttribute('href');
			const rel = link.getAttribute('rel') || '';

			if (href) {
				// 使用目标网站URL作为基准，而不是请求URL
				const baseUrl = new URL(normalizedUrl);
				const iconUrl = new URL(href, baseUrl).href;

				// 获取尺寸信息
				const sizes = link.getAttribute('sizes') || 'unknown';

				// 获取格式信息
				const type = link.getAttribute('type') || '';
				let format = 'unknown';

				if (type) {
					// 从MIME类型提取格式
					format = type.split('/')[1] || 'unknown';
				} else if (href.includes('.')) {
					// 从URL后缀猜测格式
					const parts = href.split('.');
					format = parts[parts.length - 1]
						.split('?')[0]
						.toLowerCase();
				}

				// 特殊处理常见的格式别名
				if (format === 'x-icon') {
					format = 'ico';
				}

				console.log(`找到图标: ${rel} - ${iconUrl} (size: ${sizes}, format: ${format})`);

				icons.push({
					url: iconUrl,
					size: sizes,
					format: format
				});
			}
		});

		// 如果没有找到任何图标标签，则返回默认的 favicon 地址
		if (icons.length === 0) {
			const baseUrl = new URL(normalizedUrl);
			const defaultIconUrl = new URL('/favicon.ico', baseUrl).href;
			console.log(`未找到图标标签，使用默认图标: ${defaultIconUrl}`);
			icons.push({
				url: defaultIconUrl,
				size: 'unknown',
				format: 'ico'
			});
		}

		return {
			result: icons
		};
	} catch (error) {
		console.error(`获取图标失败: ${error.message}`);
		return null;
	}
}

export default getFaviconUrl;
