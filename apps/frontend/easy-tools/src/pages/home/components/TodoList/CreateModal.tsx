import React from "react";
import { Modal, Input } from "antd";

type CreateModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  newTodo: string;
  onTodoChange: (value: string) => void;
};

const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  onCancel,
  onOk,
  newTodo,
  onTodoChange,
}) => {
  return (
    <Modal
      title="新建待办事项"
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="确认"
      cancelText="取消"
      centered
    >
      <Input
        value={newTodo}
        onChange={(e) => onTodoChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onOk()}
        placeholder="请输入待办内容"
        className="dark:bg-gray-700 dark:text-white"
      />
    </Modal>
  );
};

export default CreateModal;
