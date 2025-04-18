import { Layout, Button, Avatar } from "antd";

const { Header: AntHeader } = Layout;

type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <AntHeader
      style={{
        backgroundColor: "white",
        height: 56,
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        borderBottom: "1px solid #eaeaea",
        marginBottom: 10,
      }}>
      <Button icon={<span>⬅️</span>} style={{ marginRight: 10 }} />
      <div style={{ fontSize: 18, fontWeight: "bold", marginRight: "auto" }}>
        {title}
      </div>

      <Avatar src="https://picsum.photos/48/48" />
    </AntHeader>
  );
}

export default Header;
