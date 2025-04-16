import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../layout/Layout";
import React from "react";

const PdfComponent = React.lazy(() => import("../view/pdf"));
const PdfSplitPage = React.lazy(() => import("../view/pdf/Split"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pdf",
    element: <Layout />,
    children: [
      { path: "concat", element: <PdfComponent /> },
      { path: "split", element: <PdfSplitPage /> },
    ],
  },
  {
    path: "/split",
    element: <PdfSplitPage />,
  },
]);
