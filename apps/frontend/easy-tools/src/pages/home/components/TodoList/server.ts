import axios from "@/server";
import {
  Todo,
  TodoAddRequest,
  TodoUpdateRequest,
  TodoArchiveRequest,
  TodoDeleteRequest,
} from "@gixy/types";

// API基础路径
const API_BASE = "/api/todo";

/**
 * 获取待办事项列表
 */
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE}/get`);
  if ("todos" in response) {
    return response.todos;
  }
  throw new Error("获取待办事项失败");
};

/**
 * 添加新待办事项
 */
export const addTodo = async (data: TodoAddRequest): Promise<Todo> => {
  const result = await axios.post<{ todo: Todo }>(`${API_BASE}/add`, data);
  return result.todo;
};

/**
 * 更新待办事项状态
 */
export const updateTodoStatus = async (
  data: TodoUpdateRequest,
): Promise<Todo> => {
  const response = await axios.post(`${API_BASE}/update`, data);
  if ("todo" in response) {
    return response.todo;
  }
  throw new Error("更新待办事项状态失败");
};

/**
 * 归档待办事项
 */
export const archiveTodo = async (data: TodoArchiveRequest): Promise<Todo> => {
  const response = await axios.post(`${API_BASE}/archive`, data);
  if ("todo" in response) {
    return response.todo;
  }
  throw new Error("归档待办事项失败");
};

/**
 * 删除待办事项
 */
export const deleteTodo = async (
  data: TodoDeleteRequest,
): Promise<{ success: boolean; id: string }> => {
  const response = await axios.delete(`${API_BASE}/delete`, { data });
  if ("success" in response) {
    return;
  }
  throw new Error("删除待办事项失败");
};
