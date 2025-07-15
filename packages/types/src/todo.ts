export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	archived: boolean;
	guestId: string;
	createdAt: string;
	updatedAt: string;
}

/**
 * 创建新待办事项的请求参数
 */
export interface TodoAddRequest {
	text: string;
}

/**
 * 更新待办事项状态的请求参数
 */
export interface TodoUpdateRequest {
	id: string;
	completed: boolean;
	archived: boolean;
}

/**
 * 归档待办事项的请求参数
 */
export interface TodoArchiveRequest {
	id: string;
	archived: boolean;
}

/**
 * 删除待办事项的请求参数
 */
export interface TodoDeleteRequest {
	id: string;
}

/**
 * 获取待办事项列表的响应格式
 */
export interface TodoGetResponse {
	todos: Todo[];
}

/**
 * 添加待办事项的响应格式
 */
export interface TodoAddResponse {
	todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> & {
		id?: string;
		createdAt?: string;
		updatedAt?: string;
	};
}

/**
 * 更新和归档待办事项的响应格式
 */
export interface TodoUpdateResponse {
	todo: Todo;
}

/**
 * 删除待办事项的响应格式
 */
export interface TodoDeleteResponse {
	success: boolean;
	id: string;
}

/**
 * API错误响应格式
 */
export interface ApiError {
	error: string;
}

/**
 * 所有Todo相关API响应的联合类型
 */
export type TodoApiResponse =
	| TodoGetResponse
	| TodoAddResponse
	| TodoUpdateResponse
	| TodoDeleteResponse
	| ApiError;
