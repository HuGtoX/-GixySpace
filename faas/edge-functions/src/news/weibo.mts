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

export default async () => {
	const url = 'https://weibo.com/ajax/side/hotSearch';
	const res: Res = await fetch(url).then((res) => res.json());

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
