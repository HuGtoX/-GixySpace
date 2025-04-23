import { useState } from "react";
import { Upload, Button, message } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { PDFDocument } from "pdf-lib";
import { Container } from "../components";
import type { UploadFile } from "antd";
import DragList from "./DragList";

const { Dragger } = Upload;

type RcFileType = File & { uid?: string };
export interface CustomUploadFile extends UploadFile {
  file: RcFileType;
}

const PdfMerger = () => {
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // 处理文件上传
  const handleUpload = (info: { file: RcFileType } & any) => {
    const {
      file: { uid, name, size },
    } = info;

    setFileList((prev) => [
      ...prev,
      {
        uid,
        name,
        size,
        file: info.file,
      },
    ]);
  };

  // 处理文件删除
  const handleDelete = (uid: string) => {
    setFileList((prev) => prev.filter((file) => uid !== file.uid));
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
          pdfDoc.getPageIndices()
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
      message.error("合并失败，请检查文件");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      title="合并"
      footer={
        <Button
          block
          type="primary"
          onClick={handleMerge}
          loading={isLoading}
          disabled={fileList.length < 2}
          style={{ height: 46, fontSize: 16 }}>
          开始合并 PDF 🚀
        </Button>
      }>
      {contextHolder}
      <Dragger
        name="pdf"
        multiple
        listType="picture-card"
        showUploadList={false}
        maxCount={10}
        beforeUpload={async (file) => {
          if (file.type !== "application/pdf") {
            messageApi.error("请上传PDF格式的文件");
            return false;
          }
          return file;
        }}
        customRequest={handleUpload}>
        <p className="ant-upload-drag-icon">
          <DragOutlined style={{ fontSize: 24 }} />
        </p>
        <p className="ant-upload-text">拖拽或点击上传PDF</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      <DragList
        handleDelete={handleDelete}
        items={fileList}
        onChange={setFileList}
      />
    </Container>
  );
};

export default PdfMerger;
