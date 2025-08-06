"use client";

import React, { useState } from "react";
import { Layout, message, Button } from "antd";
import { ScissorOutlined } from "@ant-design/icons";
import Container from "@/components/layout/ToolsLayout/Container";
import { downloadFile } from "@gixy/utils";
import FileUploader from "@/components/FileUploader";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";

const { Content } = Layout;

type Pages = Array<{
  id: number;
  canvas: string;
  selected: boolean;
  pageNumber: number;
}>;

const PdfSplitPage = () => {
  const [pages, setPages] = useState<Pages>([]);
  const [pdfDoc, setPdfDoc] = useState<PDFDocument>();
  const [selectedPages, setSelectedPages] = useState<number[]>([]);

  const handlePageSplit = async () => {
    try {
      if (!pdfDoc) {
        message.error("请先上传PDF文档");
        return;
      }
      if (selectedPages.length === 0) {
        message.error("请选择要拆分的页面");
        return;
      }
      const newPdfDoc = await PDFDocument.create();
      const sortedPages = selectedPages.sort((a, b) => a - b);
      for (let i = 0; i < selectedPages.length; i++) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [
          sortedPages[i],
        ]);
        newPdfDoc.addPage(copiedPage);
      }
      const newPdfBytes = await newPdfDoc.save();
      const newPdfBlob = new Blob([newPdfBytes], { type: "application/pdf" });
      const newPdfUrl = URL.createObjectURL(newPdfBlob);
      downloadFile(newPdfUrl, "split.pdf");

      return;
    } catch (error) {
      console.error("拆分PDF失败:", error);
      message.error("拆分PDF时发生错误，请检查控制台日志");
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setSelectedPages((prev) => {
      if (prev.includes(pageNumber)) {
        return prev.filter((num) => num !== pageNumber);
      }
      return [...prev, pageNumber];
    });
  };

  const handleUpload = async (files: any[]) => {
    for (const { file } of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfBytes = e.target.result as ArrayBuffer;

        // 2. 使用 pdf-lib 加载 PDF 文档
        const pdfDoc = await PDFDocument.load(pdfBytes);
        setPdfDoc(pdfDoc);

        // 1. 使用 pdfjs-dist 加载并渲染页面（用于预览）
        const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        const pageCount = pdf.numPages;
        for (let i = 1; i <= pageCount; i++) {
          const page = await pdf.getPage(i);
          const scale = 1;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) {
            message.error(`第${i}页渲染失败：无法获取canvas上下文`);
            continue;
          }
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          const canvasDataURL = canvas.toDataURL("image/png");
          setPages((prev) => [
            ...prev,
            {
              id: Date.now() + i,
              pageNumber: i,
              canvas: canvasDataURL,
              selected: false,
            },
          ]);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // 工具说明内容
  const instructions = {
    title: "使用说明",
    content: [
      "上传PDF文件：点击下方的文件上传按钮，选择需要拆分的PDF文档（仅支持PDF格式）。",
      "预览页面：上传成功后，页面会显示所有PDF页面的缩略图，每个缩略图右上角显示页码。",
      "选择页面：点击需要拆分的页面缩略图，选中的页面会显示蓝色边框和背景色（可多选）。",
      "执行拆分：确认选择后，点击顶部的“完成”按钮，系统将生成并自动下载拆分后的PDF文件（仅包含选中页面）。",
    ],
    tips: "整个转换过程都在您的本地进行，我们不会上传任何数据到云端服务器",
  };

  return (
    <Container
      title="PDF拆分"
      header={
        <div className="flex justify-end p-4">
          <Button
            type="primary"
            icon={<ScissorOutlined />}
            onClick={handlePageSplit}
          >
            完成拆分
          </Button>
        </div>
      }
      instructions={instructions}
    >
      <Content>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-4">
          {pages.map((page) => (
            <div
              key={page.id}
              className="relative rounded-lg border border-solid border-gray-200 p-1 transition-colors hover:cursor-pointer"
              onClick={() => handlePageClick(page.pageNumber - 1)}
              style={{
                borderColor: selectedPages.includes(page.pageNumber - 1)
                  ? "#1677ff"
                  : "#e8e8e8",
                backgroundColor: selectedPages.includes(page.pageNumber - 1)
                  ? "#f0f5ff"
                  : "white",
              }}
            >
              <img
                src={page.canvas}
                alt="PDF页面"
                className="h-[150px] w-full object-cover"
              />
              <div className="absolute left-1 top-1 rounded bg-black/60 px-2 py-1 text-white">
                第{page.pageNumber}页
              </div>
            </div>
          ))}
        </div>
        <FileUploader
          accept={["pdf"]}
          onUploadSuccess={handleUpload}
          buttonText="上传PDF文件"
        />
      </Content>
    </Container>
  );
};

export default PdfSplitPage;
