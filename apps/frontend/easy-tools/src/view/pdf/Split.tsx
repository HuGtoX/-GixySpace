import { Layout, Button, InputNumber } from "antd";
import { Header as GixyHeader, Toolbar } from "./components";
const { Header, Content } = Layout;

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
    <div>
      {/* 顶部工具栏 */}
      <GixyHeader title="拆分" />

      {/* 操作工具栏 */}
      <Toolbar>
        <Button
          icon={<span>➕</span>}
          onClick={handleAdd}
          style={{ marginRight: 10 }}>
          添加
        </Button>
        <Button
          icon={<span>↩️</span>}
          onClick={handleRotateLeft}
          style={{ marginRight: 10 }}>
          向左旋转
        </Button>
        <Button
          icon={<span style={{ transform: "scaleX(-1)" }}>↩️</span>}
          onClick={handleRotateRight}
          style={{ marginRight: 10 }}>
          向右旋转
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
          }}>
          <span style={{ fontSize: 14, marginRight: 10 }}>拆分，每隔</span>
          <InputNumber
            min={1}
            defaultValue={1}
            style={{ width: 40, marginRight: 10 }}
          />
          <span style={{ fontSize: 14, marginRight: 10 }}>页面</span>
          <Button type="primary" onClick={handleComplete}>
            完成 →
          </Button>
        </div>
      </Toolbar>
      {/* 文档区域 */}
      <Content
        style={{
          backgroundColor: "#f5f8fe",
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
    </div>
  );
};

export default SplitDocumentInterface;
