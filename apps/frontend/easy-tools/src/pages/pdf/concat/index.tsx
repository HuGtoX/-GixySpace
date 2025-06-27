import { useState } from "react";
import { Button, message } from "antd";
import { PDFDocument } from "pdf-lib";
import { Container } from "@/layout/ToolsLayout";
import DragList from "./DragList";
import FileUploader from "@/components/FileUploader";
import { content } from "./Right";

type RcFileType = File & { id: string };
export interface CustomUploadFile extends RcFileType {
  file: RcFileType;
}

const PdfMerger = () => {
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // 处理文件上传
  const handleUpload = (files: any[]) => {
    console.log("-- [ files ] --", files);
    setFileList((prev) => [...prev, ...files]);
  };

  // 处理文件删除
  const handleDelete = (uid: string) => {
    setFileList((prev) => prev.filter((file) => uid !== file.id));
  };

  // 合并PDF逻辑
  const handleMerge = async () => {
    if (fileList.length < 2) {
      return messageApi.warning("请至少上传2个PDF文件");
    }
    setIsLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of fileList) {
        const pdfBytes = await file.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices(),
        );
        pages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.pdf";
      link.click();

      URL.revokeObjectURL(url);

      message.success("PDF合并成功！");
      setFileList([]);
    } catch (error) {
      message.error("合并失败，请检查文件", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      title="PDF合并"
      instructions={{
        content,
      }}
      footer={
        <Button
          block
          type="primary"
          onClick={handleMerge}
          loading={isLoading}
          disabled={fileList.length < 2}
          style={{ height: 46, fontSize: 16 }}
        >
          开始合并 PDF 🚀
        </Button>
      }
    >
      {contextHolder}
      <FileUploader
        onUploadSuccess={handleUpload}
        accept={["application/pdf"]}
        multiple
      ></FileUploader>

      <DragList
        handleDelete={handleDelete}
        items={fileList}
        onChange={setFileList}
      />
    </Container>
  );
};

export default PdfMerger;
