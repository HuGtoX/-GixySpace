import { Layout } from "antd";
import { Container, Toolbar } from "../components";
const { Content } = Layout;

const SplitDocumentInterface = () => {
  const handleAdd = () => {
    console.log("添加操作");
  };

  const handleRotateLeft = () => {
    console.log("向左旋转操作");
  };

  const handleRotateRight = () => {
    console.log("向右旋转操作");
  };

  const handleComplete = () => {
    console.log("完成操作");
  };

  return (
    <Container
      title="拆分"
      header={
        <Toolbar
          handleAdd={handleAdd}
          handleRotateRight={handleRotateRight}
          handleRotateLeft={handleRotateLeft}
          handleComplete={handleComplete}
        />
      }>
      <Content
        style={{
          padding: 20,
          overflowY: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 20,
          alignContent: "start",
        }}>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div
              style={{
                width: "100%",
                height: 120,
                backgroundColor: "white",
                border: "1px solid #e5e5e5",
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}>
              <img
                src={`https://picsum.photos/180/120?random=${index + 1}`}
                alt="页面预览"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#666",
                display: "flex",
                alignItems: "center",
              }}>
              <div
                style={{
                  backgroundColor: "#f5e8c3",
                  padding: "2px 6px",
                  borderRadius: 4,
                  marginRight: 4,
                  fontSize: 12,
                }}>
                ppt.pdf
              </div>
              <span>{index + 1}</span>
            </div>
          </div>
        ))}
        <div
          style={{
            width: "100%",
            height: 120,
            border: "1px dashed #c0c0c0",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#69c0ff",
            cursor: "pointer",
          }}
          onClick={handleAdd}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid #69c0ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}>
            +
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#69c0ff",
              textAlign: "center",
              lineHeight: 1.5,
            }}>
            添加 PDF、图像、Word、Excel 和 PowerPoint 文档
          </div>
        </div>
      </Content>
    </Container>
  );
};

export default SplitDocumentInterface;
