import { Layout, Button } from "antd";
import styles from "./style.module.scss";
const { Header: AntHeader } = Layout;

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <AntHeader
      className={`${styles.header} bg-white dark:bg-gray-800`}
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        borderBottom: "1px solid #eaeaea",
        marginBottom: 10,
      }}
    >
      <Button icon={<span>⬅️</span>} style={{ marginRight: 10 }} />
      <div style={{ fontSize: 18, fontWeight: "bold", marginRight: "auto" }}>
        {title}
      </div>
    </AntHeader>
  );
}

export default Header;
