import { Layout, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <AntHeader
      className={
        "overflow-hidden rounded-md h-14 flex items-center px-3 border-solid border-b border-gray-200 dark:border-gray-700 mb-2.5 bg-white dark:bg-gray-800"
      }
    >
      <Button
        icon={<span>⬅️</span>}
        style={{ marginRight: 10 }}
        onClick={() => navigate(-1)}
      />
      <div style={{ fontSize: 18, fontWeight: "bold", marginRight: "auto" }}>
        {title}
      </div>
    </AntHeader>
  );
}

export default Header;
