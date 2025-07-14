import { useState } from "react";
import { Modal, Input } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type TodoListProps = {
  initialTodos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ initialTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [visible, setVisible] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const renderTodo = (todo: Todo) => (
    <div
      key={todo.id}
      className="flex items-center justify-between rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggle(todo.id)}
          className="h-4 w-4 rounded text-primary dark:text-dark-primary"
        />
        <label
          className={`ml-2 text-sm ${todo.completed ? "text-gray-400 line-through" : ""}`}
        >
          {todo.text}
        </label>
      </div>
      <button
        onClick={() => handleDelete(todo.id)}
        className="p-1 text-gray-400 hover:text-red-500"
        aria-label="删除任务"
      >
        <FaTrash size={16} />
      </button>
    </div>
  );

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <div className="rounded-xl bg-white p-4 shadow-md dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">待办事项</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80"
          >
            {showCompleted ? "显示所有任务" : "查看已完成任务"}
          </button>
          <button
            onClick={() => setVisible(true)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 dark:text-dark-primary dark:hover:text-dark-primary/80"
          >
            <FaPlus />
            添加任务
          </button>
        </div>
      </div>
      <Modal
        title="新建待办事项"
        open={visible}
        onOk={handleAddTodo}
        onCancel={() => setVisible(false)}
        okText="确认"
        cancelText="取消"
        centered
      >
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="请输入任务内容"
          className="dark:bg-gray-700 dark:text-white"
        />
      </Modal>
      <div className="space-y-1">
        {showCompleted
          ? todos.filter((todo) => todo.completed).map(renderTodo)
          : todos.filter((todo) => !todo.completed).map(renderTodo)}
      </div>
    </div>
  );
};

export default TodoList;
