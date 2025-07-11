import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
