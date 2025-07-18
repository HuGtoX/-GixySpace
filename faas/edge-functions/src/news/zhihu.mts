import { corsHeaders } from '../../utils/index.mts';

interface ZhihuRes {
	data: {
		type: 'hot_list_feed';
		style_type: '1';
		feed_specific: {
			answer_count: 411;
		};
		target: {
			title_area: {
				text: string;
			};
			excerpt_area: {
				text: string;
			};
			image_area: {
				url: string;
			};
			metrics_area: {
				text: string;
				font_color: string;
				background: string;
				weight: string;
			};
			label_area: {
				type: 'trend';
				trend: number;
				night_color: string;
				normal_color: string;
			};
			link: {
				url: string;
			};
		};
	}[];
}

// 超时控制函数
const withTimeout = <T,>(promise: Promise<T>, timeoutMs = 5000): Promise<T> => {
	return Promise.race([
		promise,
		new Promise<T>((_, reject) =>
			setTimeout(() => reject(new Error('请求超时')), timeoutMs)
		)
	]);
};

export default async (_: Request) => {
	try {
		const url =
			'https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true';
		const res = await withTimeout(
			fetch(url, {
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
					Referer: 'https://www.zhihu.com/'
				},
				cache: 'no-store'
			})
		);

		if (!res.ok) {
			throw new Error(`API请求失败: ${res.status}`);
		}

		const data: ZhihuRes = await res.json();

		const result = data.data.map((k) => {
			return {
				id: k.target.link.url.match(/(\d+)$/)?.[1] ?? k.target.link.url,
				title: k.target.title_area.text,
				extra: {
					info: k.target.metrics_area.text,
					hover: k.target.excerpt_area.text
				},
				url: k.target.link.url
			};
		});
		return {
			result,
			config: {
				headers: {
					...corsHeaders,
					'Cache-Control': 'public, max-age=60, s-maxage=60'
				}
			}
		};
	} catch (error) {
		console.error('知乎热搜获取失败:', error);
		return {
			result: [],
			config: {
				status: 500,
				headers: corsHeaders
			}
		};
	}
};
