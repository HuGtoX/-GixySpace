/**
 * 一言接口返回数据类型
 */
export interface DailySentence {
	id: number;
	hitokoto: string;
	type: string;
	from: string;
	from_who: string | null;
	creator: string;
	creator_uid: number;
	reviewer: number;
	uuid: string;
	commit_from: string;
	created_at: string;
	length: number;
}
