interface Res {
	ok: number; // 1 is ok
	data: {
		realtime: {
			num: number;
			emoticon: string;
			icon?: string; // 热，新 icon url
			icon_width: number;
			icon_height: number;
			is_ad?: number; // 1
			note: string;
			small_icon_desc: string;
			icon_desc?: string; // 如果是 荐 ,就是广告
			topic_flag: number;
			icon_desc_color: string;
			flag: number;
			word_scheme: string;
			small_icon_desc_color: string;
			realpos: number;
			label_name: string;
			word: string; // 热搜词
			rank: number;
		}[];
	};
}

interface HotSearchItem {
	id: string;
	title: string;
	url: string;
	mobileUrl: string;
}

export default async () => {
	// const url = 'https://weibo.com/ajax/side/hotSearch';
	// const res: Res = await fetch(url).then((res) => res.json());

	const res: Res = await fetch('https://weibo.com/ajax/side/hotSearch', {
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language':
				'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
			'client-version': 'v2.47.96',
			priority: 'u=1, i',
			'sec-ch-ua':
				'"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': '"Windows"',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-origin',
			'x-requested-with': 'XMLHttpRequest'
		},
		referrer: 'https://weibo.com/hot/search',
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
		credentials: 'include'
	}).then((res) => res.json());

	const result = res.data.realtime
		.filter((k) => !k.is_ad)
		.map((k) => {
			const keyword = k.word_scheme ? k.word_scheme : `#${k.word}#`;
			return {
				id: k.word,
				title: k.word,
				extra: {
					icon: k.icon && {
						url: k.icon,
						scale: 1.5
					}
				},
				url: `https://s.weibo.com/weibo?q=${encodeURIComponent(keyword)}`,
				mobileUrl: `https://m.weibo.cn/search?containerid=231522type%3D1%26q%3D${encodeURIComponent(keyword)}&_T_WM=16922097837&v_p=42`
			};
		});

	return {
		result
	};
};
