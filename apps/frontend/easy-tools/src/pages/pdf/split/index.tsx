import { useState } from "react";
import { Layout, message } from "antd";
import { Container, Toolbar } from "../../../layout/ToolsLayout";
import { downloadFile } from "@gixy/utils";
import FileUploader, { AcceptMap } from "@/components/FileUploader";
import * as workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
import { content } from "./Right";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc.default;

const { Content } = Layout;

type Pages = Array<{
  id: number;
  canvas: string;
  selected: boolean;
  pageNumber: number;
}>;

const SplitDocumentInterface = () => {
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

  return (
    <Container
      title="PDF拆分"
      header={<Toolbar handleComplete={handlePageSplit} />}
      instructions={{
        tips: "整个转换过程都在您的本地进行，我们不会上传任何数据到云端服务器",
        content,
      }}
    >
      <Content>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-4">
          {pages.map((page, index) => (
            <div
              key={page.id}
              className="relative border p-1 border-solid border-gray-200 rounded-lg  hover:cursor-pointer transition-colors"
              onClick={() => handlePageClick(index)}
              style={{
                borderColor: selectedPages.includes(index)
                  ? "#1677ff"
                  : "#e8e8e8",
                backgroundColor: selectedPages.includes(index)
                  ? "#f0f5ff"
                  : "white",
              }}
            >
              <img
                src={page.canvas}
                alt="PDF页面"
                className="w-full h-[150px] object-cover"
              />
              <div className="absolute top-1 left-1 text-white bg-black/60 px-2 py-1 rounded">
                第{page.pageNumber}页
              </div>
            </div>
          ))}
        </div>
        <FileUploader accept={[AcceptMap.pdf]} onUploadSuccess={handleUpload} />
      </Content>
    </Container>
  );
};

export default SplitDocumentInterface;
