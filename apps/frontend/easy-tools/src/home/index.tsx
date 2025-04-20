import Header from "./components/Header";
import HotTools from "./components/HotTool";
import { useNavigate } from "react-router-dom";
import { toolsMenu } from "./config";
import { Row, Col } from "antd";
import "./style.scss";

const ToolMenuPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Header />

      <div className="tool-menu">
        <Row wrap gutter={[16, 16]} justify="center">
          {toolsMenu.map((tool) => (
            <Col key={tool.id} xs={24} sm={12} md={8} lg={6}>
              <div
                onClick={() => navigate(tool.url)}
                key={tool.id}
                className="tool-menu__card fade-in">
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </div>
            </Col>
          ))}
        </Row>

        <HotTools />
      </div>
    </div>
  );
};

export default ToolMenuPage;
