interface Res {
	data: {
		word_list: {
			sentence_id: string;
			word: string;
			event_time: string;
			hot_value: string;
		}[];
	};
}

export default async () => {
	const url =
		'https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1';
	const cookie = (
		await fetch(
			'https://www.douyin.com/passport/general/login_guiding_strategy/?aid=6383'
		)
	).headers.getSetCookie();
	const res: Res = await fetch(url, {
		headers: {
			cookie: cookie.join('; ')
		}
	}).then((res) => res.json());

	const result = res.data.word_list.map((k) => {
		return {
			id: k.sentence_id,
			title: k.word,
			url: `https://www.douyin.com/hot/${k.sentence_id}`
		};
	});
	return {
		result
	};
};
