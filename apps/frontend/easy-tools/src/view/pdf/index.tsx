import { useState } from "react";
import { Upload, List, Button, message, Space } from "antd";
import { DragOutlined, DeleteOutlined } from "@ant-design/icons";
import { PDFDocument } from "pdf-lib";
import { Header } from "./components";

const PdfMerger = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 处理文件上传
  const handleUpload = (info: any) => {
    setFileList((prev) => [
      ...prev,
      {
        uid: info.file.uid,
        name: info.file.name,
        size: `${(info.file.size / 1024).toFixed(2)}KB`,
        url: URL.createObjectURL(info.file.originFileObj),
        file: info.file.originFileObj,
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
      return message.warning("请至少上传2个PDF文件");
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
      console.error("合并PDF时出错:", error);
      message.error("合并失败，请检查文件");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <Header title="合并" />

      <Upload
        name="pdf"
        multiple
        accept=".pdf"
        listType="picture-card"
        showUploadList={false}
        maxCount={10}
        fileList={fileList}
        onChange={handleUpload}
        customRequest={() => {}}
        style={{ width: "100%", marginBottom: 24 }}>
        {fileList.length >= 10 ? null : (
          <div style={{ padding: 16 }}>
            <DragOutlined style={{ fontSize: 24 }} />
            <div style={{ marginTop: 8 }}>拖拽或点击上传PDF</div>
          </div>
        )}
      </Upload>

      <List
        itemLayout="horizontal"
        dataSource={fileList}
        renderItem={(item) => (
          <List.Item
            key={item.uid}
            draggable
            onDragEnd={(e) => handleDragEnd(e)}
            style={{
              marginBottom: 16,
              padding: 16,
              borderRadius: 8,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}>
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
