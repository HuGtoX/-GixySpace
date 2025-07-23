import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/Layout";
import React from "react";

const PdfComponent = React.lazy(() => import("../pages/pdf/concat"));
const PdfSplitPage = React.lazy(() => import("../pages/pdf/split"));
const ImageTransformPage = React.lazy(() => import("../pages/image/transform"));
const RealTimeRenderPage = React.lazy(() => import("../pages/realTimeRender"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/image",
    element: <Layout />,
    children: [{ path: "transform", element: <ImageTransformPage /> }],
  },
  {
    path: "/dev",
    element: <Layout />,
    children: [{ path: "realtime-render", element: <RealTimeRenderPage /> }],
  },
]);

