import { useState } from "react";
import { Modal, Input } from "antd";
import { FaPlus } from "react-icons/fa";

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

  const handleToggle = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: newTodo, completed: false },
    ]);
    setNewTodo("");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">待办事项</h3>
        <button
          onClick={() => setVisible(true)}
          className="flex items-center gap-1 text-xs text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80"
        >
          <FaPlus />
          添加任务
        </button>
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
      </div>
      <div className="space-y-3">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="w-4 h-4 text-primary dark:text-dark-primary rounded"
            />
            <label
              className={`ml-2 text-sm ${todo.completed ? "line-through text-gray-400" : ""}`}
            >
              {todo.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
