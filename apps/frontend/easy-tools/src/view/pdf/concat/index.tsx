import { useState } from "react";
import { Upload, List, Button, message, Space } from "antd";
import { DragOutlined, DeleteOutlined } from "@ant-design/icons";
import { PDFDocument } from "pdf-lib";
import { Header } from "../components";
import style from "./style.module.scss";

const { Dragger } = Upload;

const PdfMerger = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  // 处理文件上传
  const handleUpload = (info: any) => {
    setFileList((prev) => [
      ...prev,
      {
        uid: info.file.uid,
        name: info.file.name,
        size: `${(info.file.size / 1024).toFixed(2)}KB`,
        url: URL.createObjectURL(info.file),
        file: info.file,
      },
    ]);
  };

  // 处理文件删除
  const handleDelete = (uid: string) => {
    setFileList((prev) => prev.filter((file) => file.uid !== uid));
  };

  // 处理拖拽排序
  const handleDragEnd = (e: any) => {};

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
    <div style={{ padding: 32 }}>
      <Header title="合并" />
      {contextHolder}
      <Dragger
        name="pdf"
        multiple
        listType="picture-card"
        showUploadList={false}
        maxCount={10}
        fileList={fileList}
        beforeUpload={async (file) => {
          console.log("-- [ file ] --", file);
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

      <List
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={(item) => (
          <List.Item
            key={item.uid}
            draggable
            onDragEnd={(e) => handleDragEnd(e)}
            className={style.list__item}>
            <List.Item.Meta
              avatar={
                <img src="https://placehold.co/64x64?text=PDF" alt="pdf" />
              }
              title={<span>{item.name}</span>}
              description={<span>大小: {item.size}</span>}
            />
            <Space>
              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(item.uid)}
                type="link"
                style={{ color: "#ff4d4f" }}>
                删除
              </Button>
            </Space>
          </List.Item>
        )}
        locale={{
          emptyText: (
            <div style={{ padding: 24, textAlign: "center" }}>
              上传文件开始合并，支持最多10个PDF
            </div>
          ),
        }}
      />

      <Button
        type="primary"
        block
        onClick={handleMerge}
        loading={isLoading}
        disabled={fileList.length < 2}
        style={{ height: 52, marginTop: 32, fontSize: 16 }}>
        开始合并 PDF 🚀
      </Button>
    </div>
  );
};

export default PdfMerger;
