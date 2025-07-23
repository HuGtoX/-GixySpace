import { useState, useEffect } from "react";
import { Tooltip, Modal, message, Spin } from "antd";
import {
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaHistory,
  FaRegCalendarCheck,
} from "react-icons/fa";
import SectionCard from "../SectionCard";
import DetailModal from "./DetailModal";
import ActionButton from "@/components/ActionButton";
import {
  getTodos,
  addTodo,
  updateTodoStatus,
  archiveTodo,
  deleteTodo,
} from "./server";
import type { Todo as TodoType } from "@gixy/types";
import { getGuestId } from "@/utils/guestUtils";

type Todo = TodoType;

type TodoListProps = {};

const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedModalVisible, setCompletedModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      message.error("获取待办事项失败");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    // 保存原始状态用于回滚
    const originalCompleted = todo.completed;
    // 乐观更新UI - 取消勾选时同时设为未归档
    const newCompletedState = !originalCompleted;
    const newArchivedState = newCompletedState ? todo.archived : false;

    setTodos((todos) =>
      todos.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: newCompletedState,
              archived: newArchivedState,
            }
          : t,
      ),
    );

    try {
      await updateTodoStatus({
        id,
        completed: !originalCompleted,
        archived: newArchivedState,
      });
      // API成功，无需额外操作
    } catch (error) {
      // 失败回滚
      setTodos((todos) =>
        todos.map((t) =>
          t.id === id ? { ...t, completed: originalCompleted } : t,
        ),
      );
      message.error("更新状态失败");
      console.error(error);
    }
  };

  const handleArchiveTask = async (id: string) => {
    // 保存原始待办事项用于回滚
    const originalTodo = todos.find((t) => t.id === id);
    if (!originalTodo) return;

    // 乐观更新UI - 标记为归档而非删除
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, archived: true } : t)),
    );

    try {
      await archiveTodo({ id, archived: true });
      message.success("已移至历史");
    } catch (error) {
      // 失败回滚 - 恢复归档状态
      if (originalTodo) {
        setTodos((todos) =>
          todos.map((t) => (t.id === id ? { ...t, archived: false } : t)),
        );
      }
      message.error("归档失败");
      console.error(error);
    }
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      // 保存原始待办事项用于回滚
      const originalTodo = todos.find((t) => t.id === taskToDelete);
      if (!originalTodo) return;

      // 乐观更新UI
      setTodos((todos) => todos.filter((t) => t.id !== taskToDelete));
      setDeleteConfirmVisible(false);

      try {
        await deleteTodo({ id: taskToDelete });
        message.success("删除成功");
      } catch (error) {
        // 失败回滚
        setTodos((todos) => [...todos, originalTodo]);
        message.error("删除失败");
        console.error(error);
      }
    }
  };

  const renderTodo = (todo: Todo) => (
    <div
      key={todo.id}
      className="group flex items-center justify-between rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleComplete(todo.id)}
          className="h-4 w-4 rounded text-primary dark:text-dark-primary"
        />
        <label
          className={`ml-2 text-sm ${todo.completed ? "text-gray-400 line-through" : ""}`}
        >
          {todo.text}
        </label>
      </div>
      <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={() => handleToggleComplete(todo.id)}
          className={`p-1 ${todo.completed ? "text-green-500" : "text-gray-400 hover:text-green-500"}`}
          aria-label={todo.completed ? "取消完成" : "标记为已完成"}
        >
          <FaCheckCircle size={16} />
        </button>
        {todo.completed && (
          <Tooltip title="归档" placement="top">
            <button
              onClick={() => handleArchiveTask(todo.id)}
              className="p-1 text-gray-400 hover:text-blue-500"
              aria-label="移到历史任务"
            >
              <FaHistory size={16} />
            </button>
          </Tooltip>
        )}
        <button
          onClick={() => handleDeleteClick(todo.id)}
          className="p-1 text-gray-400 hover:text-red-500"
          aria-label="删除任务"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    // 生成临时ID
    const tempId = `temp-${Date.now()}`;
    const tempTodo = {
      id: tempId,
      text: newTodo.trim(),
      guestId: await getGuestId(),
      completed: false,
      archived: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 乐观更新UI
    setTodos([...todos, tempTodo]);
    setNewTodo("");

    try {
      // 调用API
      const newTodo = await addTodo({ text: tempTodo.text });
      // 用真实数据替换临时数据
      setTodos((todos) => todos.map((t) => (t.id === tempId ? newTodo : t)));
      message.success("添加成功");
    } catch (error) {
      // 失败回滚
      setTodos((todos) => todos.filter((t) => t.id !== tempId));
      message.error("添加失败，请重试");
      console.error(error);
    }
  };

  return (
    <SectionCard
      title="待办事项"
      right={
        <div className="flex gap-3">
          <ActionButton
            onClick={() => setCompletedModalVisible(true)}
            icon={<FaRegCalendarCheck size={16} />}
            ariaLabel="查看历史完成任务"
            size="sm"
          />
        </div>
      }
    >
      {/* <CreateModal
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={handleAddTodo}
        newTodo={newTodo}
        onTodoChange={setNewTodo}
      /> */}

      <DetailModal
        visible={completedModalVisible}
        onCancel={() => setCompletedModalVisible(false)}
        todos={todos}
        onToggleComplete={handleToggleComplete}
        onDeleteClick={handleDeleteClick}
      />

      <Modal
        zIndex={1001}
        title="确认删除"
        open={deleteConfirmVisible}
        onOk={confirmDelete}
        onCancel={() => setDeleteConfirmVisible(false)}
        okText="删除"
        cancelText="取消"
        centered
        okButtonProps={{ danger: true }}
      >
        <p>确定要删除此任务吗？此操作不可撤销。</p>
      </Modal>

      <div className="max-h-[250px] space-y-1 overflow-auto">
        <Spin spinning={loading} tip="加载中...">
          {todos.filter((todo) => !todo.archived).length === 0 ? (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <div className="mb-2 text-4xl">📝</div>
              <p>暂无待办事项</p>
              <p className="mt-1 text-sm">点击"添加任务"开始创建</p>
            </div>
          ) : (
            todos.filter((todo) => !todo.archived).map(renderTodo)
          )}
        </Spin>
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          placeholder="添加新任务..."
          className="box-border min-w-0 flex-1 rounded-l-lg bg-gray-50 px-3 py-2 text-sm ring-primary focus:outline-none focus:ring-1 dark:bg-dark-bg2"
        />
        <button
          onClick={handleAddTodo}
          className="box-border rounded-r-lg bg-primary px-3 py-2 text-white transition-colors hover:bg-primary/90 dark:bg-dark-primary"
        >
          <FaPlus />
        </button>
      </div>
    </SectionCard>
  );
};

export default TodoList;
