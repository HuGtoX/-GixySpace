import React from "react";
import { Modal } from "antd";
import { FaTrash } from "react-icons/fa";
import dayjs from 'dayjs';
import type { Todo as TodoType } from "@gixy/types";

type Todo = TodoType;

type DetailModalProps = {
  visible: boolean;
  onCancel: () => void;
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDeleteClick: (id: string) => void;
};

const renderTodo = (
  todo: Todo,
  onToggleComplete: (id: string) => void,
  onDeleteClick: (id: string) => void,
) => (
  <div
    key={todo.id}
    className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    <div className="flex flex-1 items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="mr-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label
        className={`text-sm ${todo.completed ? "text-gray-500 line-through" : ""}`}
        style={{ wordBreak: "break-all", flex: 1 }}
      >
        {todo.text}
      </label>
    </div>
    <div className="flex gap-1">
      <button
        onClick={() => onDeleteClick(todo.id)}
        className="p-1 text-gray-400 hover:text-red-500"
        aria-label="删除任务"
      >
        <FaTrash size={16} />
      </button>
    </div>
  </div>
);

const DetailModal: React.FC<DetailModalProps> = ({
  visible,
  onCancel,
  todos,
  onToggleComplete,
  onDeleteClick,
}) => {
  // 过滤、排序并按更新时间分组已归档任务
  const archivedTodos = todos
    .filter(todo => todo.archived)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  // 按日期分组任务
  const groupedTodos = archivedTodos.reduce((groups, todo) => {
    const date = dayjs(todo.updatedAt).format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {} as Record<string, Todo[]>);

  return (
    <Modal
      title="历史完成任务"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
    >
      <div className="max-h-[400px] space-y-4 overflow-y-auto p-2">
        {archivedTodos.length > 0 ? (
          Object.entries(groupedTodos).map(([date, groupTodos]) => (
            <div key={date} className="mb-4">
              <h3 className="mb-2 text-sm font-medium text-gray-500">
                {dayjs(date).format('YYYY年MM月DD日')}
              </h3>
              <div className="space-y-1 pl-2 border-l-2 border-gray-200">
                {groupTodos.map(todo => renderTodo(todo, onToggleComplete, onDeleteClick))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-500">暂无已完成任务</div>
        )}
      </div>
    </Modal>
  );
};

export default DetailModal;
