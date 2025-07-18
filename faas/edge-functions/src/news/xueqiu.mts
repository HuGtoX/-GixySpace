interface StockRes {
	data: {
		items: {
			code: string;
			name: string;
			percent: number;
			exchange: string;
			// 1
			ad: number;
		}[];
	};
}

export default async () => {
	const url =
		'https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=30&_type=10&type=10';
	const cookie = (
		await fetch('https://xueqiu.com/hq')
	).headers.getSetCookie();
	const res: StockRes = await fetch(url, {
		headers: {
			cookie: cookie.join('; ')
		}
	}).then((res) => res.json());

	const result = res.data.items
		.filter((k) => !k.ad)
		.map((k) => ({
			id: k.code,
			url: `https://xueqiu.com/s/${k.code}`,
			title: k.name,
			extra: {
				info: `${k.percent}% ${k.exchange}`
			}
		}));
	return {
		result
	};
};
